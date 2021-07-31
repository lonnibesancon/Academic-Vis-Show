################################################################
# Main.R
# Code for to fetch data for Academic Hiring Visualization
# CC-BY Lonni Besançon et al., 2021
################################################################

#Check that "likert" is installed
if(!require(scholar)){
  install.packages("scholar")
  library(scholar)
}

#Documentation for the scholar package is here: https://cran.r-project.org/web/packages/scholar/scholar.pdf


list <- read.csv("../data/list.csv")
list$id <- c()

length(list)


for(i in 1:nrow(list)){
  id <- get_scholar_id(last_name = list$family[i], first_name = list$first[i])
  list$id[i] <- id
}

# Define the id for the researcher
id <- 'ulkW7fgAAAAJ'

# Get his profile and print his name
l <- get_profile(id)
l$name 

# Get his citation history, i.e. citations to his work in a given year 
get_citation_history(id)

# Get his publications (a large data frame)
publication_list <-get_publications(id)


predict_h_index(id)