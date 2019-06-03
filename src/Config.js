// Below are setting for the app that need to be configured before building and deploying to any server.
//  
// --------------------- HELP --------------------------
// 
// apiURL : url to the server which is hosting your api
// appURL : url to the server where you intend to deploy this frontend application
// siteAvailability : can be either (private | public)
// samplesEndpoint :  samples endpoint to use based above defined 'siteAvailability'
// 


const settings = {
    "apiURL" : "http://localhost:8080",
    "appURL" : "http://localhost:3000",
     "siteAvailability" : "private",
    "proteinsEndpoint" : "/reviewProteins",
    "topicsEndpoint" : "/reviewTopics",
    // "aliasesEndpoint" : "/aliases",
    // "sgdEndpoint" : "/sgdInfo",
    // "trackHubPrefix" : "http://genome.ucsc.edu/cgi-bin/hgTracks?db=sacCer3&hubUrl=http://www.bx.psu.edu/~giardine/yepHub/hub2/hub.txt&textSize=12&sgdGene=dense&hgt.labelWidth=25&centerLabels=off&position=chrI%3A0-230218" 
}

module.exports = {
    settings : settings
}