'use strict'

// create voteSummary from votes array with two keys
const getVoteSummary = (votes) => {
  const voteSummary = {
    up: 0,
    down: 0
  }
  votes.forEach((vote) => {
    switch (vote.value){
      case 1:
        voteSummary.up += 1
        break
      case -1:
        voteSummary.down += 1
        break
    }
  })
  return voteSummary
}

module.exports = {
  getVoteSummary
}
