library(geodiveR)
library(RPostgreSQL)
library(jsonlite)
library(dplyr)
library(tidyr)

con <- dbConnect(drv = "PostgreSQL",
                    user = "postgres",
                    password = "postgres",
                    host = "localhost",
                    port = "5432",
                    dbname = "regexdb")

data(publications)

pubs <- jsonlite::fromJSON(publications, simplifyDataFrame = TRUE, flatten = TRUE)

pubs$doi <- sapply(pubs$identifier, function(x)x$id)
  
authors <- pubs$`_gddid` %>% 
  purrr::map(function(x) {
    aulist <- unlist(pubs$author[pubs$`_gddid` == x])
    if(length(aulist) == 0) { aulist <- NA }
    return(data.frame(gddid = x,
               authors = aulist,
               stringsAsFactors = FALSE))}) %>% 
  bind_rows()

journals <- data.frame(jid = 1:length(unique(pubs$journal.name)),
                       journal = unique(pubs$journal.name))

journalpaper <- data.frame(gddid = pubs$`_gddid`,
                            jid = match(pubs$journal.name, journals$journal))


pubs <- pubs %>% 
  select(publisher, title, year, number, volume, "_gddid", type, pages, doi)

checkReplaceTable <- function(con, x, data) {
  check <- dbExistsTable(conn = con, name = x)
  if(!check) {
    out <- dbWriteTable(conn = con, x, data, row.names = FALSE)
    return(out)
  } else {
    kill <- dbRemoveTable(conn = con, x)
    if (kill) {
      out <- dbWriteTable(con, x, data, row.names = FALSE)
    } else {
      stop('Could not remove table')
    }
    return(out)
  }
}

# Load the NLP data

data(nlp)

sent <- checkReplaceTable(con = con, x = "sentences", data = nlp)
journ <- checkReplaceTable(con = con, x = "journal", data = journals)
journ_link <- checkReplaceTable(con = con, x = "journallink", data = journalpaper)
author_table <- checkReplaceTable(con = con, x = "gddauthors", data = authors)
pub_table <- checkReplaceTable(con, x = "publications", data = pubs)
