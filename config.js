var format = require('util').format;

 var config = {}

 config.raceCentreCollectionId = "RaceCentre";
 config.raceDetailsCollectionId = "RaceDetails";
 config.teamCollectionId = "Team";
 config.riderCollectionId = "Rider";
 config.raceStartListId = "RaceStartList";
 config.newsCollectionId = "News";
 config.raceResultId = "RaceResult";
 config.raceAnalyticsId = "RaceAnalytics";
 config.raceConfigId = "RaceConfig";
 config.featureCardsId = "FeatureCards";
 config.broadcastUserId = "BroadcastUser";
 config.userTrackerId = "UserTracker";
 config.raceSeriesConfigurationId = "RaceSeriesConfiguration"
 
 config.mongodbVelon_poolSize=50;
 config.mongodbVelonUser_poolSize=10;
 
 config.loggerEnable = true;
 config.loggerDebug = false;
 config.resourceCount = 13;
 
 
 config.useDummyLiveTime = false;
 config.dummyCurrentEpochTime = 1487929081;
 
 module.exports = config;
