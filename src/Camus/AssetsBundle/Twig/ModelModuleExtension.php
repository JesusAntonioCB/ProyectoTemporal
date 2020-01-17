<?php
// src/AppBundle/Twig/AppExtension.php
namespace App\Camus\AssetsBundle\Twig;

use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;
use Twig\TwigFilter;
use Symfony\Component\DependencyInjection\ContainerInterface;

class ModelModuleExtension extends AbstractExtension
{
  protected $container;
  private $loadedFacebook = false;
  public function __construct(ContainerInterface $container = null){
    $this->container = $container;
  }
  public function getFunctions()
  {
    return array(
      new TwigFunction('getProfileUser', array($this, 'getProfileUser')),
      new TwigFunction('setEmbedModules', array($this, 'setEmbedModules')),
      new TwigFunction('getMatchSrv', array($this, 'getMatchSrv')),
      new TwigFunction('sportsScorers', array($this, 'sportsScorers')),
      new TwigFunction('sportsResults', array($this, 'sportsResults')),
      new TwigFunction('sportsClassification', array($this, 'sportsClassification')),
      new TwigFunction('sportsTickets', array($this, 'sportsTickets')),
      new TwigFunction('getPathUrl', array($this, 'getPathUrl')),
      new TwigFunction('getDataLeague', array($this, 'getDataLeague')),
      new TwigFunction('getUrlStadistics', array($this, 'getUrlStadistics')),
      new TwigFunction('getDataTeamHeader', array($this, 'getDataTeamHeader')),
      new TwigFunction('getRoundData', array($this, 'getRoundData')),
      new TwigFunction('getSeasonRoundData', array($this, 'getSeasonRoundData')),
      new TwigFunction('statsService', array($this, 'statsService')),
      new TwigFunction('getStatsURL', array($this, 'getStatsURL')),
      new TwigFunction('getTickerCaliente', array($this, 'getTickerCaliente')),
      new TwigFunction('getAutomaticMam', array($this, 'getAutomaticMam')),
      new TwigFunction('dateConvert', array($this, 'dateConvert')),
      new TwigFunction('getUrlResumen', array($this, 'getUrlResumen')),
      new TwigFunction('getMatchData', array($this, 'getMatchData')),
      new TwigFunction('getDataTeam', array($this, 'getDataTeam')),
      new TwigFunction('getPlayerBio', array($this, 'getPlayerBio')),
      new TwigFunction('getPlayerStats', array($this, 'getPlayerStats')),
      new TwigFunction('getImageMictlan', array($this, 'getImageMictlan')),
      new TwigFunction('error404', array($this, 'error404'),['needs_environment' => true]),
      new TwigFunction('existFile', array($this, 'existFile')),
      new TwigFunction('includeFile', array($this, 'includeFile')),
    );
  }
  public function getFilters()
  {
    return array(
      new TwigFilter('getModelModule', array($this, 'getModelModule')),
      new TwigFilter('asImage', array($this, 'asImage')),
      new TwigFilter('asImageHeading', array($this, 'asImageHeading')),
      new TwigFilter('asImageTeam', array($this, 'asImageTeam')),
      new TwigFilter('asImageClip', array($this, 'asImageClip')),
      new TwigFilter('asSponsor', array($this, 'asSponsor')),
      new TwigFilter('twigJsonDecode', array($this, 'twigJsonDecode')),
      new TwigFilter('socialTag', array($this, 'socialTag')),
      new TwigFilter('pregReplace', array($this, 'pregReplace')),
      new TwigFilter('normalize', array($this, 'normalize')),
      new TwigFilter('localDate', array($this, 'localDate')),
      new TwigFilter('localMonth', array($this, 'localMonth')),
      new TwigFilter('gentleDate', array($this, 'gentleDate')),
      new TwigFilter('splitTemplate', array($this, 'splitTemplate')),
      new TwigFilter('asImageAuthor', array($this, 'asImageAuthor')),
      new TwigFilter('parseRGB', array($this, 'parseRGB')),
      new TwigFilter('decodeText', array($this, 'decodeText')),
      new TwigFilter('linkConstruct', array($this, 'linkConstruct')),
      new TwigFilter('charsDecode', array($this, 'charsDecode')),
      new TwigFilter('filterEnt', array($this, 'filterEnt')),
      new TwigFilter('parserHtml', array($this, 'parserHtml')),
      new TwigFilter('asHost', array($this, 'asHost')),
      new TwigFilter('urlToRelative', array($this, 'urlToRelative')),
      new TwigFilter('imageSize', array($this, 'imageSize')),
      new TwigFilter('transformDate', array($this, 'transformDate')),
      new TwigFilter('getCalienteUrl', array($this, 'getCalienteUrl')),
      new TwigFilter('extImage', array($this, 'extImage'))
    );
  }

  public function getDataTeamHeader($idTeam){
    $hostMictlan = $this->container->getParameter('servicesMictlan');
    $slug = $_SERVER['REQUEST_URI'];
    $arraySlug = array_values(array_filter(explode('/', $slug)));
    $oldSlug = "/".$arraySlug[0]."/".$arraySlug[1]."/".$arraySlug[2];
    $competition = null;
    $season = null;
    if(isset($arraySlug[3])){
      $competition = $arraySlug[3];
    }
    if(isset($arraySlug[4])){
      $season = $arraySlug[4];
    }
    $idCompetition = '';
    if($competition!=null){
      $competitionJson = json_decode(@file_get_contents($hostMictlan.'soccer/teams/'.$idTeam.'/calendar'), true);
      $competitionArray = $competitionJson['dimensions']['bundle'][0]['values'];
      foreach ($competitionArray as $key => $compVal) {
        $selectedCompetition = $this->normalize($compVal['label']);
        if($selectedCompetition==$competition){
          $idCompetition = $compVal['id'];
        }
      }
    }
    $idSeason = '';
    if($season!=null){
      $seasonJson = json_decode(@file_get_contents($hostMictlan.'soccer/teams/'.$idTeam.'/calendar?competition='.$idCompetition), true);
      $seasonArray = $seasonJson['dimensions']['bundle'][1]['values'];
      foreach ($seasonArray as $key => $seasonVal) {
        $selectedSeason = $this->normalize($seasonVal['label']);
        if($selectedSeason==$season){
          $idSeason = $seasonVal['id'];
        }
      }
    }
    $resultServices = json_decode(@file_get_contents($hostMictlan.'soccer/teams/'.$idTeam.'/calendar?competition='.$idCompetition.'&season='.$idSeason), true);
    $nameTeamJson = json_decode(@file_get_contents($hostMictlan.'soccer/resolve?teamId='.$idTeam), true);
    $teamData = array(
      'teamData' => $nameTeamJson['data']['team'],
    );
    $urlData = array(
      'oldPath' => $oldSlug
    );
    array_push($resultServices,$nameTeamJson);
    array_push($resultServices,$urlData);
    if($resultServices['dimensions']['configuration']['competition']!='9d6460c9-47d8-4017-9f5d-70d79017e244'){
      if(isset($resultServices['dimensions']['bundle'][1])){
         unset($resultServices['dimensions']['bundle'][1]);
      }
    }
    return $resultServices;
  }

  public function getDataTeam($template,$idTeam){
    if($idTeam != ""){
      $hostMictlan = $this->container->getParameter('servicesMictlan');
      $pathData = explode('/', $_SERVER['REQUEST_URI']);
      $competition = "";
      if (isset($pathData[4])) {
        $competition = strtolower(str_replace("-"," ",$pathData[4]));
      }
      $season = "";
      if (isset($pathData[5])) {
        $season = strtolower(str_replace("-"," ",$pathData[5]));
      }
      $tableType = "";
      $statsServices = array(
        'club_player_most_goaler' => 'playerMostGoaler',
        'club_player_most_blocking' => 'playerMostBlocking',
        'club_player_passes_most_successful' => 'playerPassesMostSuccessful',
        'club_player_most_saves' => 'goalkeeperMostSaves',
        'club_player_most_expulsions' => 'playerMostExpulsions',
        'club_player_most_amonstations' => 'playerMostAmonstations',
        'club_team_most_goalers' => 'teamMostGoalers',
        'club_team_most_defensive' => 'teamMostDefensive',
        'club_team_expulsions' => 'teamExpulsions',
        'club_team_amonestations' => 'teamAmonestations'
      );

      switch ($template) {
        case 'club_calendary':
          $dataType = "calendar";
          $competitionType = "competition";
          $seasonType = "season";
          break;
        case 'club_roster':
          $dataType = "roster";
          $competitionType = "competitionId";
          $seasonType = "seasonId";
          break;
        case 'club_player_most_goaler':
        case 'club_player_most_blocking':
        case 'club_player_passes_most_successful':
        case 'club_player_most_saves':
        case 'club_player_most_expulsions':
        case 'club_player_most_amonstations':
        // case 'sn_stadistics_club_team_most_goalers':
        // case 'sn_stadistics_club_team_most_defensive':
        // case 'sn_stadistics_club_team_expulsions':
        // case 'sn_stadistics_club_team_amonestations':
          $dataType = "stats";
          $competitionType = "season";
          $tableType = $statsServices[$template];
          break;
        default:
          // code...
          break;
      }

      $serviceDefault = json_decode(@file_get_contents($hostMictlan.'soccer/teams/'.$idTeam.'/'.$dataType), true);

      if(!empty($competition) && empty($tableType)){
        foreach ($serviceDefault["dimensions"]["bundle"] as $keyB => $valueB) {
          if($valueB["name"] == 'competition'){
            foreach ($valueB["values"] as $keyC => $valueC) {
              if(strtolower($valueC["label"]) == $competition){
                $competitionId = $valueC["id"];
              }
            }
          }
        }
        if(!empty($season)){
          $serviceDefaultCompetition = json_decode(@file_get_contents($hostMictlan.'soccer/teams/'.$idTeam.'/'.$dataType.'?'.$competitionType.'='.$competitionId), true);
          foreach ($serviceDefaultCompetition["dimensions"]["bundle"] as $keyB => $valueB) {
            if($valueB["name"] == 'season'){
              foreach ($valueB["values"] as $keyS => $valueS) {
                if(strtolower($valueS["label"]) == $season){
                  $seasonId = $valueS["id"];
                }
              }
            }
          }
          $resultServices = json_decode(@file_get_contents($hostMictlan.'soccer/teams/'.$idTeam.'/'.$dataType.'?'.$competitionType.'='.$competitionId.'&'.$seasonType.'='.$seasonId), true);
        } else {
          $resultServices = json_decode(@file_get_contents($hostMictlan.'soccer/teams/'.$idTeam.'/'.$dataType.'?'.$competitionType.'='.$competitionId), true);
        }
      } elseif (!empty($tableType)) {
        $resultStats = json_decode(@file_get_contents($hostMictlan.'soccer/teams/'.$idTeam.'/'.$dataType.'?statsTable='.$tableType), true);
        if (!empty($season)) {
          foreach ($serviceDefault["dimensions"]["bundle"] as $keyB => $valueB) {
            if($valueB["name"] == 'season'){
              foreach ($valueB["values"] as $keyC => $valueC) {
                if(strtolower($valueC["label"]) == $season){
                  $seasonId = $valueC["id"];
                }
              }
            }
          }
          $resultServices = json_decode(@file_get_contents($hostMictlan.'soccer/teams/'.$idTeam.'/'.$dataType.'?statsTable='.$tableType.'&season='.$seasonId), true);
        } else {
          $resultServices = $resultStats;
        }
      }else {
        $resultServices = $serviceDefault;
      }
      return $resultServices;
    }else{
      return array();
    }

  }

  public function getPlayerBio($idPlayer){
    $hostMictlan = $this->container->getParameter('servicesMictlan');
    $resultServices = json_decode(@file_get_contents($hostMictlan."soccer/players/".$idPlayer), true);
    if(!$resultServices){
      $resultServices =  null;
    }
    return $resultServices;
  }

  public function getPlayerStats($idPlayer){
    $hostMictlan = $this->container->getParameter('servicesMictlan');
    $resultServices = json_decode(@file_get_contents($hostMictlan."soccer/players/".$idPlayer."/stats"), true);
    if(!$resultServices){
      $resultServices =  null;
    }
    return $resultServices;
  }

  public function getModelModule($modelData){
    $modelDataArray = $modelData;
    // $modelData = $this->convertArrayToObject($modelData);
    $modelData = (object)$modelData;
    $modelDataFilter = array(
      'type' => $modelData->type,
      'template' => $modelData->template,
      'templateName' => $modelData->type."_".$modelData->template,
      'id' => '',
      'title' => '',
      'subtitle' => '',
      'heading' => array(
        'title' => '',
        'media' => ''
      ),
      'extraHeading' => array(
        'title' => ''
      ),
      'extraMedia' => array(
        'title' => '',
        'icon' => 'default',
        'indicator' => 'default'
      ),
      'extraLink' => '',
      "abstract" => '',
      "signaturePlace" => '',
      "tags" => array(),
      'thumbnail' => '/bundles/camusassets/images/placeholder.jpg',
      'thumbnailClip' => '',
      'hasThumbnailClip' => false,
      'media' => '/bundles/camusassets/images/placeholder.jpg',
      "alt" => "",
      'teamHome' => '',
      'teamHomeMedia' => '',
      'scoreHome' => '',
      'teamAway' => '',
      'teamAwayMedia' => '',
      'scoreAway' => '',
      'periodMatch' => '',
      'minuteMatch' => '',
      'teamHomePenalty' => '',
      'teamAwayPenalty' => '',
      "color" => '',
      "slug" => '',
      "body" => '',
      "provider" => '',
      "providerReference" => '',
      "author" => '',
      "authorMedia" => '',
      "authorSlug" => '',
      "section" => '',
      "content" => '',
      "column" => '',
      "columnTitle" => '',
      "hasMedia" => false,
      "hasThumbnail" => false,
      "hasSponsor" => false,
      "adPos" => '',
      'source' => '',
      'paging' => '',
      'summary' => '',
      'sponsor' => array(
        'media' => '',
        'url' => ''
      ),
      'adCode' => '',
      'adTarget' => '',
      'adId' => '',
      'date' => '',
      'place' => '',
      'related' => '',
      'publishedHour' => '',
      'publishedDate' => '',
      'frame' => '',
      'creationDate' => '',
      'modules' => array(),
      'penaltiesPoints' => array(),
      'dataSearch' => '',
      'leagueId' => '',
      'idPlayer' => '',
      'idTeam' => ''
    );

    if(strpos($modelData->type,"ad_") !== false){ //AdFilter
      foreach ($modelData as $key => $value){
        if(isset($value)){
          switch ($key) {
            case 'id':
            case 'adId':
            case 'adPos':
              $modelDataFilter[$key] = $value;
              break;
            case 'extraData':
              if (isset($value->target)) {
                $modelDataFilter['adTarget'] = $value->target;
              }
              break;
            case 'codes':
              if (isset($value->web)) {
                $modelDataFilter['adCode'] = $value->web;
              }
              break;
            default:
              break;
          }
        }
      }
      return $modelDataFilter;
    }

    if(isset($modelData->name) && $modelData->name != null){
        $modelDataFilter["templateName"] = $modelData->name;
    }

    if(isset($modelData->id) && $modelData->id != null){
      $modelDataFilter['id'] = $modelData->id;
    }
    if(isset($modelData->extraData["leagueId"]) && $modelData->extraData["leagueId"] != null){
      $modelDataFilter['leagueId'] = $modelData->extraData["leagueId"];
    }
    if(isset($modelData->idPlayer) && $modelData->idPlayer != null){
      $modelDataFilter['idPlayer'] = $modelData->idPlayer;
    }
    if(isset($modelData->extraData["clubId"]) && $modelData->extraData["clubId"] != null){
      $modelDataFilter['idTeam'] = $modelData->extraData["clubId"];
    }
    if(isset($modelData->title) && $modelData->title != null){
      $modelDataFilter['title'] = $this->filterEnt($modelData->title);
      // $modelDataFilter['title'] = '"No te la creas, pend...", <b>Thalía arremete contra cantautor.<b>';
    }

    if(isset($modelData->subtitle) && $modelData->subtitle != null){
      $modelDataFilter['subtitle'] = $this->filterEnt($modelData->subtitle);
    }

    if(isset($modelData->heading) && $modelData->heading != null && is_string($modelData->heading)){
      $modelDataFilter['heading']["title"] = $this->filterEnt(strip_tags($modelData->heading));
    }else if(isset($modelData->heading["title"]) && $modelData->heading["title"] != null){
      $modelDataFilter['heading']["title"] = $this->filterEnt(strip_tags($modelData->heading["title"]));
    }
    // $modelDataFilter['heading']["title"] = 'cinepolis';
    if(isset($modelData->extraData["headingTitle"]) && $modelData->extraData["headingTitle"] != null){
      $modelDataFilter['extraHeading']["title"] = strip_tags($modelData->extraData["headingTitle"]);
    }

    if(isset($modelData->extraData["ruteInfo"]) && $modelData->extraData["ruteInfo"] != null && is_array($modelData->extraData["ruteInfo"])){
      $modelDataFilter['extraHeading']["ruteInfo"] = $modelData->extraData["ruteInfo"];
    }

    if(isset($modelData->extraData["folderInfo"]) && $modelData->extraData["folderInfo"] != null && is_array($modelData->extraData["ruteInfo"])){
      $modelDataFilter['extraHeading']["folderInfo"] = $modelData->extraData["folderInfo"];
    }

    if(isset($modelData->extraData["mediaTitle"]) && $modelData->extraData["mediaTitle"] != null){
      $modelDataFilter['extraMedia']["title"] = $modelData->extraData["mediaTitle"];
    }

    if(isset($modelData->extraData["linkedElements"])){
      $modelDataFilter['extraLink'] = $modelData->extraData["linkedElements"][0];
    }

    if(isset($modelData->summary) && $modelData->summary != null && is_string($modelData->summary)){
      $modelDataFilter['abstract'] = $modelData->summary;
    }else if(isset($modelData->abstract) && $modelData->abstract != null){
      $modelDataFilter['abstract'] = $modelData->abstract;
    }

    if(isset($modelData->headingColorTheme) && $modelData->headingColorTheme != null){
      $modelDataFilter['color'] = $modelData->headingColorTheme;
    }else {
      if(isset($modelData->headingcolortheme) && $modelData->headingcolortheme != null){
        $modelDataFilter['color'] = $modelData->headingcolortheme;
      }
    }

    if(isset($modelData->extraData["mediaIconVisible"]) && $modelData->extraData["mediaIconVisible"] != null){
      $modelDataFilter['extraMedia']["icon"] = $modelData->extraData["mediaIconVisible"];
    }
    if(isset($modelData->extraData["mediaIndicatorVisible"]) && $modelData->extraData["mediaIndicatorVisible"] != null){
      $modelDataFilter['extraMedia']["indicator"] = $modelData->extraData["mediaIndicatorVisible"];
    }
    if(isset($modelData->extraData["penaltiesPoints"]) && $modelData->extraData["penaltiesPoints"] != null){
      $modelDataFilter['penaltiesPoints'] = $modelData->extraData["penaltiesPoints"];
	  }
    if(isset($modelData->teamHome) && $modelData->teamHome != null){
      $modelDataFilter["teamHome"] = $modelData->teamHome;
    }
    if(isset($modelData->teamHomeMedia) && $modelData->teamHomeMedia != null){
      $modelDataFilter["teamHomeMedia"] = $modelData->teamHomeMedia;
    }
    if(isset($modelData->scoreHome) && $modelData->scoreHome != null){
      $modelDataFilter["scoreHome"] = $modelData->scoreHome;
    }
    if(isset($modelData->teamAway) && $modelData->teamAway != null){
      $modelDataFilter["teamAway"] = $modelData->teamAway;
    }
    if(isset($modelData->teamAwayMedia) && $modelData->teamAwayMedia != null){
      $modelDataFilter["teamAwayMedia"] = $modelData->teamAwayMedia;
    }
    if(isset($modelData->scoreAway) && $modelData->scoreAway != null){
      $modelDataFilter["scoreAway"] = $modelData->scoreAway;
    }
    if(isset($modelData->periodMatch) && $modelData->periodMatch != null){
      $modelDataFilter["periodMatch"] = $modelData->periodMatch;
    }
    if(isset($modelData->minuteMatch) && $modelData->minuteMatch != null){
      $modelDataFilter["minuteMatch"] = $modelData->minuteMatch;
    }
    if(isset($modelData->teamHomePenalty) && $modelData->teamHomePenalty != null){
      $modelDataFilter["teamHomePenalty"] = $modelData->teamHomePenalty;
    }
    if(isset($modelData->teamAwayPenalty) && $modelData->teamAwayPenalty != null){
      $modelDataFilter["teamAwayPenalty"] = $modelData->teamAwayPenalty;
    }

    if(isset($modelData->heading["media"]) && $modelData->heading["media"] != null){
      $modelDataFilter['heading']["media"] = $modelData->heading["media"];
    }else if(isset($modelData->heading["src"]) && $modelData->heading["src"] != null){
      $modelDataFilter['heading']["media"] = $modelData->heading["src"];
    }
    if(isset($modelData->media) && $modelData->media != null && !is_array($modelData->media) && !is_object($modelData->media)){
      if (isset($modelData->media["src"])) {
        $modelDataFilter['media'] = $modelData->media["src"];
      }else if(is_string($modelData->media)) {
        $modelDataFilter['media'] = $modelData->media;
      }
      if (isset($modelData->media["providerName"])){
        $modelDataFilter['provider'] = $modelData->media["providerName"];
      }
      if (isset($modelData->media["publishedVersion"]["providerReference"])){
        $modelDataFilter['providerReference'] = $modelData->media["publishedVersion"]["providerReference"];
      }
      // $modelDataFilter['mediaAlt'] = $modelData->media[0]["publishedVersion"]["title"];
      $modelDataFilter['hasMedia'] = true;
    }elseif(isset($modelData->media) && $modelData->media != null && is_array($modelData->media) || is_object($modelData->media)) {
      $modelDataFilter['media'] = $modelData->media;
      $modelDataFilter['hasMedia'] = true;
    }

    if(isset($modelData->thumbnail) && $modelData->thumbnail != null && is_array($modelData->thumbnail)){
      if (isset($modelData->thumbnail["src"])) {
        $modelDataFilter['thumbnail'] = $modelData->thumbnail["src"];
      }else if(is_string($modelData->thumbnail)) {
        $modelDataFilter['thumbnail'] = $modelData->thumbnail;
      }

      if(isset($modelData->thumbnail["publishedVersion"]["title"])){
        $modelDataFilter['alt'] = $modelData->thumbnail["publishedVersion"]["title"];
      }

      $modelDataFilter['hasThumbnail'] = true;
    }elseif(isset($modelData->thumbnail) && $modelData->thumbnail != null && !is_array($modelData->thumbnail)) {
      $modelDataFilter['thumbnail'] = $modelData->thumbnail;
      $modelDataFilter['hasThumbnail'] = true;
    }

    if(isset($modelData->thumbnailClippingLarger) && $modelData->thumbnailClippingLarger != null){
      if (isset($modelData->thumbnailClippingLarger["src"])) {
        $modelDataFilter['thumbnailClip'] = $modelData->thumbnailClippingLarger["src"];
        $modelDataFilter['hasThumbnailClip'] = true;
      }
    }

    if(isset($modelData->content) && $modelData->content != null){
      $modelDataFilter['content'] = $modelData->content;
    }
    if(isset($modelData->content["slug"]) && $modelData->content["slug"] != null){
      $modelDataFilter['slug'] = $modelData->content["slug"];
    }
    if(isset($modelData->content["publishedHour"]) && $modelData->content["publishedHour"] != null){
      $modelDataFilter['publishedHour'] = $modelData->content["publishedHour"];
    }else if(isset($modelData->publishedHour) && $modelData->publishedHour != null){
      $modelDataFilter['publishedHour'] = $modelData->publishedHour;
    }
    if(isset($modelData->conten["publishedDate"]) && $modelData->conten["publishedDate"] != null){
      $publishedDate = $modelData->conten["publishedDate"];
      if(!empty($modelData->content["publishedHour"])) $publishedDate.='/';
      $modelDataFilter['publishedDate'] = $publishedDate;
    }else if(isset($modelData->publishedDate) && $modelData->publishedDate != null){
      $publishedDate = $modelData->publishedDate;
      if(!empty($modelData->publishedHour)) $publishedDate.='/';
      $modelDataFilter['publishedDate'] = $publishedDate;
    }
    if(isset($modelData->body) && $modelData->body != null){
      $bodyEmbed = $modelData->body;
      preg_match_all('/class="(fb-post|fb-comment-embed|fb-video)"/',$bodyEmbed,$out, PREG_PATTERN_ORDER);
      if(isset($out[0])){
        if(isset($out[0][0])){
          if(!$this->loadedFacebook){
            $this->loadedFacebook = true;
            $bodyEmbed.='<div id="fb-root"></div><script>(function(d, s, id) {var js, fjs = d.getElementsByTagName(s)[0];if (d.getElementById(id)) return;js = d.createElement(s); js.id = id;js.src = "https://connect.facebook.net/es_ES/sdk.js#xfbml=1&version=v2.10";fjs.parentNode.insertBefore(js, fjs);}(document, "script", "facebook-jssdk"));</script>';
          }
        }
      }
      $bodyEmbed = preg_replace('~<\s*i class="fa.*"[^>]*>(.*?)<\s*/\s*i>~', "", $bodyEmbed);

      preg_match_all("/(?:http(?:s)?:\/\/)?(?:www\.)?(?:m\.)?(?:youtu\.be\/|youtube\.com\/(?:(?:watch)?\?(?:.*&)?v(?:i)?=|(?:embed|v|vi|user)\/))([^\?&\"'>]+)/",$bodyEmbed,$outYT, PREG_PATTERN_ORDER);
      if(isset($outYT[1])){
        if(!empty($outYT[1])){
          foreach ($outYT[1] as $key => $value) {
            $value = preg_replace("/\<\/\D*/", "", $value);
            $regexYT = '/(<iframe.*)('.$value.'.*?)<\/iframe>/i';
            $bodyEmbed = preg_replace($regexYT, '<div video-id="'.$value.'" class="camus-youtube"></div>', $bodyEmbed);
          }
        }
      }
      $modelDataFilter['body'] = $bodyEmbed;
    }
    if(isset($modelData->shortTitle) && $modelData->shortTitle != null){
      $modelDataFilter['body'] = $modelData->shortTitle;
    }

    if(isset($modelData->author) && $modelData->author != null && is_string($modelData->author)){
      $modelDataFilter['author'] = strip_tags($modelData->author);
    }else if (isset($modelData->content["author"]["name"]) && $modelData->content["author"]["name"] != null) {
      $modelDataFilter['author'] = strip_tags($modelData->content["author"]["name"]);
    }else if (isset($modelData->author["name"]) && $modelData->author["name"] != null) {
      $modelDataFilter['author'] = strip_tags($modelData->author["name"]);
    }

    if(isset($modelData->content["author"]["id"]) && $modelData->content["author"]["id"] != null){
      $modelDataFilter['authorMedia'] = $modelData->content["author"]["id"];
    }
    if(isset($modelData->content["author"]["slug"]) && $modelData->content["author"]["slug"] != null) {
      $modelDataFilter['authorSlug'] = $modelData->content["author"]["slug"];
    }
    if(isset($modelData->content["section"]) && $modelData->content["section"] != null){
      $modelDataFilter['section'] = $modelData->content["section"];
    }
    if(isset($modelData->sectionName) && $modelData->sectionName != null){
      $modelDataFilter['section'] = $modelData->sectionName;
    }
    if(isset($modelData->columnName) && $modelData->columnName != null){
      $modelDataFilter['column'] = $modelData->columnName;
    }elseif(isset($modelData->content["column"]) && $modelData->content["column"] != null){
      $modelDataFilter['column'] = $modelData->content["column"];
    }
    // if(isset($modelData->content->column) && $modelData->content->column != null){
    //   $modelDataFilter['columnTitle'] = $modelData->content->column;
    // }
    if(isset($modelData->summary) && $modelData->summary != null){
      $modelDataFilter['summary'] = $modelData->summary;
    }
    if(isset($modelData->source) && $modelData->source != null){
      $modelDataFilter['source'] = $modelData->source;
    }
    if(isset($modelData->paging) && $modelData->paging != null){
      $modelDataFilter['paging'] = $modelData->paging;
    }
    if(isset($modelData->sponsor) && $modelData->sponsor != null){
      if(isset($modelData->sponsor["media"]) && $modelData->sponsor["media"] != null){
        $modelDataFilter['sponsor']["media"] = $modelData->sponsor["media"];
        $modelDataFilter['hasSponsor'] = true;
      }
      if(isset($modelData->sponsor["url"]) && $modelData->sponsor["url"] != null){
        $modelDataFilter['sponsor']["url"] = $modelData->sponsor["url"];
      }
    }
    if(isset($modelData->modules) && $modelData->modules != null){
      if(is_array($modelDataArray) || is_object($modelDataArray)){
        $modelDataFilter['modules'] = $modelDataArray["modules"];
      }else{
        if (is_object($modelData->modules) || is_array($modelData->modules) && count($modelData->modules)>0 ) {
          foreach ($modelData->modules as $key => $value) {
            $css = explode('_',$value->type);
            if($css[0] != 'ad'){
              $css[1] = (isset($css[2])) ? $css[1].'-'.$css[2] : $css[1];
              $css = $css[0].'/'.str_replace("_","-",$css[1]).'/'.str_replace("_","-",$value->template).".css";
              if( !file_exists('./bundles/camusassets/scss/main/groups/'.$css) ){
                unset($modelData->modules[$key]);
              }
            }
          }
        }
        $modelDataFilter['modules'] = $modelData->modules;
      }
    }
    if(isset($modelData->tags) && $modelData->tags != null){
        $modelDataFilter['tags'] = $modelData->tags;
    }

    if(isset($modelData->place) &&  $modelData->place != null){
      $modelDataFilter['place'] = $modelData->place;
    }
    if(isset($modelData->signaturePlace) &&  $modelData->signaturePlace != null){
      $modelDataFilter['signaturePlace'] = $modelData->signaturePlace;
    }

    if(isset($modelData->date) && $modelData->date != null){
      $modelDataFilter['date'] = $modelData->date;
    }

    if(isset($modelData->creationDate) && $modelData->creationDate != null){
      $modelDataFilter['creationDate'] = $modelData->creationDate;
    }

    if(isset($modelData->related) && $modelData->related != null){
      $modelDataFilter['related'] = $modelData->related;
    }

    if(isset($modelData->frame) && $modelData->frame != null){
      $modelDataFilter['frame'] = $modelData->frame;
    }

    if(isset($modelData->dataSearch) && $modelData->dataSearch != null){
      $modelDataFilter['dataSearch'] = $modelData->dataSearch;
    }
    // if ($modelDataFilter['type'] == 'list_small') {
    //   $modelDataFilter['title'] = 'Title';
    // }
    // $modelDataFilter = json_decode(json_encode((array)$modelDataFilter), TRUE);
    // dump($modelDataFilter);
    return $modelDataFilter;
  }
  public function urlToRelative($media){
    $imagesHost = "";
    $imagesSubHost = "";
    $regex = "";
    if($this->container->hasParameter('images_domain')) {
      if(!empty($this->container->getParameter('images_domain'))){
        $imagesHost = $this->container->getParameter('images_domain');
        $regex = "http(s)?:\/\/".$imagesHost;
      }
      if($this->container->hasParameter('images_subdomain')) {
        if(!empty($this->container->getParameter('images_subdomain'))){
          $imagesSubHost = "((?!".$this->container->getParameter('images_subdomain').").*.)?";
          $regex = "http(s)?:\/\/".$imagesSubHost.$imagesHost;
        }
      }
    }
    if(!empty($regex)){
      return preg_replace("/".$regex."/","",$media);
    }else{
      return $media;
    }
  }
  public function asImage($media, $alt, $position = 'tl',$width=0,$height=0){
    $media = $this->urlToRelative($media);
    $tag = '<img
    data-src="'.$media.'"
    data-lazy="'.$media.'"
    src="/bundles/camusassets/images/placeholder.jpg"
    class="b-lazy"
    alt="'.$alt.'"
    data-camus-toolbar-position="'.$position.'"
    onerror="this.onerror=null;this.src=\'/bundles/camusassets/images/placeholder.jpg\'"
    data-camus-image>
    <noscript>
      <img
      src="'.$media.'"
      onerror="this.onerror=null;this.src=\'/bundles/camusassets/images/placeholder.jpg\'">
    </noscript>';

    return $tag;
  }
  public function asImageHeading($media){
    $media = $this->urlToRelative($media);
    $tag = '<img
    src="'.$media.'"
    onerror="this.onerror=null;this.src=\'/bundles/camusassets/images/extraordinary-openings/m-logo.png\'"
    data-camus-heading-media/>';

    return $tag;
  }
  public function asImageTeam($media, $type){
    $media = $this->urlToRelative($media);
    $tag = '<img
    src="'.$media.'"
    onerror="this.onerror=null;this.src=\'/bundles/camusassets/images/extraordinary-openings/m-logo.png\'"
    '.$type.'
    />';

    return $tag;
  }
  public function asImageClip($media, $largeMedia, $alt, $maxWidth = '648', $position = 'tl'){
    $media = $this->urlToRelative($media);
    $largeMedia = $this->urlToRelative($largeMedia);
    $tag = '<picture>
    <source media="(max-width: '.$maxWidth.'px)" data-srcset="'.$media.'">
    <source data-srcset="'.$largeMedia.'">
    <img data-src="'.$media.'" data-lazy="'.$media.'" src="/bundles/camusassets/images/placeholder.jpg" class="b-lazy" alt="'.$alt.'" data-camus-image data-camus-toolbar-position="'.$position.'" onerror="this.onerror=null;this.src=\'/bundles/camusassets/images/placeholder.jpg\'">
    </picture>
    <noscript>
      <picture>
      <source media="(max-width: '.$maxWidth.'px)" srcset="'.$media.'">
      <source srcset="'.$largeMedia.'">
        <img src="'.$media.'" onerror="this.onerror=null;this.src=\'/bundles/camusassets/images/placeholder.jpg\'">
      </picture>
    </noscript>';

    return $tag;
  }
  public function asSponsor($sponsor){
    $tag = '<div class="sponsor" data-camus-removable="Patrocinador"><span class="caption">Patrocinado Por</span><a href="'.$sponsor["url"].'" target="_blank" class="img-link"><img
    src="'.$sponsor["media"].'"
    onerror="this.onerror=null;this.src=\'/bundles/camusassets/images/placeholder.jpg\'"
    data-camus-sponsor /></a></div>';

    return $tag;
  }

  public function asHost($presenter, $name){
    $tag = '<div class="host"><div class="img-link"><img
    src="'.$presenter.'"
    onerror="this.onerror=null;this.src=\'/bundles/camusassets/images/placeholder.jpg\'"
    /></div></div>';

    return $tag;
  }

  public function convertArrayToObject($array){
      if (!is_array($array)) {
         return $array;
     }
     $object = new \stdClass();
     if (is_array($array) && count($array) > 0) {
       foreach ($array as $name=>$value) {
           $name = trim($name);
           if (!empty($name)) {
               $object->$name = $this->convertArrayToObject($value);
           }
       }
       return $object;
     }
     else {
         return FALSE;
     }
  }

  public function twigJsonDecode($json){

    return json_decode($json);
  }

  public function socialTag($link, $title, $picture){
    $twig = $this->container->get('twig');
    $filters = $twig->getFilters();
    $striptags = $filters['striptags']->getCallable();
    $title = $striptags($title);
    $escaper = $filters['escape']->getCallable();
    $title = $escaper($twig ,$title);
    $finalTag = '<span ';
    $finalTag .= ($link != '') ? 'data-social-link ="'.$link.'"' : 'data-social-link =""';
    $finalTag .= ($title != '') ? 'data-social-title ="'.$title.'"': '';
    $finalTag .= ($picture != '') && is_string($picture) ? 'data-social-picture ="'.$picture.'"': '';

    $finalTag .= '></span>';

    return $finalTag;
  }

  public function pregReplace($subject, $replacement){
    $newSubject = preg_replace("(http:\/\/[www|hey|laaficion]+.milenio.com)", $replacement, $subject);

    return $newSubject;
  }

  public function normalize($string){
    $original = 'ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûýýþÿŔŕ';
    $mod = 'aaaaaaaceeeeiiiidnoooooouuuuybsaaaaaaaceeeeiiiidnoooooouuuyybyRr';

    $string = strtolower($string);
    $string = preg_replace('/\s/', '-', $string);
    $string = utf8_decode($string);
    $string = strtr($string, utf8_decode($original), $mod);

    return $string;
  }

  public function localDate($date){
    $day = explode(" ",$date)[0];
    $days = array(
      'Sunday' => 'Domingo',
      'Monday' => 'Lunes',
      'Tuesday' => 'Martes',
      'Wednesday' => 'Miércoles',
      'Thursday' => 'Jueves',
      'Friday' => 'Viernes',
      'Saturday' => 'Sábado'
    );
    $newDay = str_replace($day, $days[$day], $date);

    return $newDay;
  }

  public function localMonth($date){
    $months = array(
      'January' => 'Enero',
      'February' => 'Febrero',
      'March' => 'Marzo',
      'April' => 'Abril',
      'May' => 'Mayo',
      'June' => 'Junio',
      'July' => 'Julio',
      'August' => 'Agosto',
      'September' => 'Septiembre',
      'October' => 'Octubre',
      'November' => 'Noviembre',
      'December' => 'Diciembre'
    );

    $newDay = str_replace($date, $months[$date], $date);

    return $newDay;
  }

  public function gentleDate($date){
    $date = strftime('%d de %B', strtotime($date));
    $month = explode("de ",$date)[1];
    $months = array(
      'January' => 'Enero',
      'February' => 'Febrero',
      'March' => 'Marzo',
      'April' => 'Abril',
      'May' => 'Mayo',
      'June' => 'Junio',
      'July' => 'Julio',
      'August' => 'Agosto',
      'September' => 'Septiembre',
      'October' => 'Octubre',
      'November' => 'Noviembre',
      'December' => 'Diciembre'
    );

    $newDate = str_replace($month, $months[$month], $date);
    return $newDate;
  }

  public function getName(){
    return 'ModelModule';
  }
  public function getPathUrl(){
    return $_SERVER['REQUEST_URI'];
  }
  public function getDataLeague($leagueId){
    $hostServices = $this->container->getParameter('servicesMT');
    $hostMictlan = $this->container->getParameter('servicesMictlan');
    $service = array();
    $postdata = http_build_query(
      array(
        'data' => 'stats',
        'league' => $leagueId
      )
    );
    $opts = array('http' =>
      array(
        'method'  => 'POST',
        'header'  => 'Content-type: application/x-www-form-urlencoded',
        'content' => $postdata
      )
    );

    $context  = stream_context_create($opts);
    $resultServices = @file_get_contents($hostServices, false, $context);
    $resultServices = json_decode($resultServices,true);

    if(isset($resultServices["code"])){
      if($resultServices["code"] == 200){
        foreach ($resultServices['data'] as $key => $serviceValue) {
          if($serviceValue['id'] == $leagueId){
            $service["league"] = array(
              'id' => $serviceValue['id'],
              'name' => $serviceValue['name'],
              // 'urlName' => preg_replace('/([\s])/', '-', strtolower($serviceValue['name'])),
              'urlImg' => $serviceValue['urlImg'],
            );
          }
        }
        $service["seasons"] = $resultServices["data"][0]["seasons"];
        $idSeason = $resultServices["data"][0]["seasons"][0]["id"];
        $resultRounds = @file_get_contents($hostMictlan."competitions/competitions/".$leagueId."/calendar?season=".$idSeason);
        $resultRounds = json_decode($resultRounds,true);
        if(isset($resultRounds["dimensions"])){
          foreach ($resultRounds["dimensions"]["bundle"] as $keyB => $serviceBundle) {
            if($serviceBundle['name'] == 'round'){
              $service["rounds"] = $serviceBundle["values"];
            }
            if($serviceBundle['name'] == 'seasonRound'){
              $service["seasonRounds"] = $serviceBundle["values"];
            }
          }
          if(isset($resultRounds["calendar"]["data"][0]["rows"][0]["round"]["name"])) {
            $service["config"][0] = $resultRounds["calendar"]["data"][0]["rows"][0]["season"]["name"];
          }
          if(isset($resultRounds["calendar"]["data"][0]["rows"][0]["season"]["name"])) {
            $service["config"][1] = $resultRounds["calendar"]["data"][0]["rows"][0]["round"]["name"];
          }
          if(isset($resultRounds["calendar"]["data"][0]["rows"][0]["seasons_rounds"]["name"])) {
            $service["config"][2] = $resultRounds["calendar"]["data"][0]["rows"][0]["seasons_rounds"]["name"];
          }
        }
      }
    }
    return $service;
  }
  public function error404(\Twig_Environment $environment){
    $metas = "";
    $boardColor = '#b10b1f';
    $headerType = 0;
    $notFound = '404 Not Found';

    return $environment->render("@CamusAssets/Groups/error404/error404.html.twig", array(
      'type' => '',
      'headerType' => $headerType,
      'error' => true,
      'boardColor' => $boardColor,
      'currentSection' => $notFound,
    ));
  }
  public function setEmbedModules($body, $embedModule){
    $regex = '/(<a.*?href="http(s|):\/\/(?!milenio|www\.milenio).*?)>/i';
    $bodyEmbed = $body;
    $bodyEmbed = preg_replace($regex, '$1 target="_blank" >', $bodyEmbed);
    if(count($embedModule) > 0){
      foreach ($embedModule as $key => $value) {
        $moduleModel = $this->getModelModule($value);
        $splitTemplate = $this->splitTemplate($moduleModel['type']);
        $bodyEmbed = str_replace(
          'm{'.$moduleModel['id'].'}',
          $this->container->get('templating')->render('@CamusAssets/Groups/'.$splitTemplate[0].'/'.$splitTemplate[1].'.html.twig', array('module' => $moduleModel)),
          $bodyEmbed
        );
      }
    }
    return $bodyEmbed;
  }

  public function sportsClassification(){
    $service = json_decode(@file_get_contents('http://servicios2.milenio.com/render/futbol/MX_LMP_TGT_F.json'));

    return $service;
  }

  public function getMatchSrv($url){
    $service = json_decode(@file_get_contents($url));

    if(!isset($service)){
      $service = @file_get_contents($url);
    }

    return $service;
  }

  public function sportsScorers(){
    $service = json_decode(@file_get_contents('http://servicios2.milenio.com/render/futbol/MX_LMP_GOL.json'));

    return $service;
  }

  public function sportsResults(){
    $service = json_decode(@file_get_contents('http://servicios2.milenio.com/render/futbol/MX_LMP_PPJ_L.json'));
    $jData = array("jCount" => count($service), "jAct" => "");
    if ($service != null) {
      foreach ($service as $key => $date) {
        if($date->actual){
          $jData["jAct"] = json_decode(@file_get_contents($date->documento));
          break;
        }
      }
    }

    $existingDates = array();
    foreach ($jData["jAct"] as $key => $match) {
      $match->startdate = $this->dateToString($match->startdate);
      if(!in_array($match->startdate, $existingDates)){
        array_push($existingDates, $match->startdate);
      }
      else{
        $jData["jAct"][$key]->startdate = '';
      }
      $jData["jAct"][$key] = $match;
    }
    return $jData;
  }

  public function sportsTickets($category = null, $size = 9,$group = 'event'){
    switch ($category) {
      case 'sports':
        $category = 698;
        break;
      case 'soccer':
        $category = 705;
        break;
      case 'shows':
        $category = 86;
        break;
      case 'teather':
        $category = 160;
        break;
      default:
        $category = 0;
        break;
    }
    $filters = array(
      'TDCategoryID' => $category,
      'size' => $size,
      'page' => 1,
      'group' => $group,
      'month' => date('m')
    );
    $slug = 'http://servicios2.milenio.com/ticketbis/events.php?'.http_build_query($filters);
    $service = json_decode(@file_get_contents($slug));

    $result = array(
      'total' => $service->total,
      'pages' => ceil($service->total/9),
      'content' => $service->results,
      'page' => 1
    );

    return $result;
  }

  public function splitTemplate($template){
    $type = explode("_",$template);
    $group = $type[0];
    unset($type[0]);
    array_keys($type);
    $moduleType = join("_",$type);

    return array(
      0 => $group,
      1 => $moduleType
    );
  }

  public function asImageAuthor($media){
    // $tag = '<img
    // data-lazy="'.$media.'"
    // onerror="this.onerror=null;this.src=\'/bundles/camusassets/images/placeholder.jpg\'"
    // data-camus-image/>';

    $tag = '<img
    src="/bundles/camusassets/images/autores/'.$media.'.jpg"
    onerror="this.onerror=null;this.src=\'/bundles/camusassets/images/placeholder.jpg\'"
    data-camus-image/>';

    return $tag;
  }

  public function parseRGB($rgb){
    if(strlen($rgb) > 0 ){
      $rgbExplode = explode(",",$rgb);
      if(array_key_exists(3,$rgbExplode)){
          $previousValue = $rgbExplode[3];
          // $rgbExplode[3] = 0.25;
      }
      return implode(",",$rgbExplode);
    }
  }

  public function dateToString($date){
    $days = array(
      'DOM',
      'LUN',
      'MAR',
      'MIE',
      'JUE',
      'VIE',
      'SAB'
    );

    $dayOfWeek = $days[date('w', strtotime($date))];
    $dayNumber = explode('-', $date)[2];

    $final  = $dayOfWeek.' '.$dayNumber;

    return $final;
  }

  public function decodeText($text){
    $host = $_SERVER['REQUEST_URI'];
    $admin = 'admin';
    if (strpos($host, $admin) === false) {
      if(mb_detect_encoding($text) != 'UTF-8'){
        return utf8_decode($text);
      }
      else {
        return $text;
      }
    }else{
      return $text;
    }
  }

  public function linkConstruct($slug, $exep = null){
    $link = 'href="'.$slug.'"';
    if($exep == "2"){
      $link = $link.' target="_self"';
      return $link;
    }
    preg_match('/^(?!http:.*mediotiempo|www\.mediotiempo\.com|mediotiempo\.com|\/).*/', $slug, $matches, PREG_OFFSET_CAPTURE);
    if(isset($matches[0])){
      $link = $link.' target="_blank"';
    }
    return $link;
  }

  public function charsDecode($text){
    return htmlspecialchars_decode($text);
  }

  public function filterEnt($text){
    $text = strip_tags($text);
    $ocurrences = array("&nbsp;","nbsp;","amp;");
    $text = str_replace($ocurrences, "", $text);
    return $text;
  }
  public function parserHtml($html) {
    $doc = new \DOMDocument();
  	@$doc->loadHTML(mb_convert_encoding($html, 'HTML-ENTITIES', 'UTF-8'), LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
    return $doc->saveHTML();
  }

  public function imageSize($media, $template, $alt = '', $position = 'tl'){

    $host = $this->container->getParameter('thumbor_host');
    $key = $this->container->getParameter('thumbor_key');

    $url=$media;

    // switch ($template) {
    //   case 'lr_list_row_row_numbered_red':
    //     $width = 82;
    //     $height = 95;
    //     break;
    //
    //   case 'media':
    //   case 'caption':
    //     $width = 618;
    //     $height = 348;
    //     break;
    //
    //   case 'base':
    //     $width = 958;
    //     $height = 596;
    //     break;
    //
    //   case 'profile':
    //     $width = 121;
    //     $height = 140;
    //     break;
    //
    //   case 'gallery':
    //       $width = 0;
    //       $height = 530;
    //     break;
    //
    //   case 'row_related_new':
    //     $width = 152;
    //     $height = 80;
    //     break;
    //
    //   case 'top_text':
    //     $width = 300;
    //     $height = 348;
    //     break;
    //
    //   default:
    //     break;
    // }
    //
    // if($this->container->hasParameter('thumbor_cdn')){
    //   if(!empty($this->container->getParameter('thumbor_cdn'))){
    //     $media = str_replace($this->container->getParameter('thumbor_cdn'),"",$media);
    //   }
    // }
    //
    // $meta =  "meta/".$width."x".$height."/smart/".$media;
    // $meta_hash = $this->getHash($meta, $key);
    // $meta_url = $host.$meta_hash."/"."meta/".$width."x".$height."/smart/".$media;
    //
    // $metaImage = file_get_contents($meta_url);
    // $jsonMetaImage = json_decode($metaImage,true);
    //
    // if(isset($jsonMetaImage["thumbor"]) && isset($jsonMetaImage["thumbor"]["focal_points"])){
    //   if(in_array("Face Detection", array_column($jsonMetaImage["thumbor"]["focal_points"], 'origin'))) {
    //     $result = $width."x".$height."/smart/".$media;
    //     $res_hash = $this->getHash($result, $key);
    //     $url = $host.$res_hash."/".$width."x".$height."/smart/".$media;
    //   }else{
    //     $result = $width."x".$height."/".$media;
    //     $res_hash = $this->getHash($result, $key);
    //     $url = $host.$res_hash."/".$width."x".$height."/".$media;
    //   }
    // }else{
    //   $result = $width."x".$height."/".$media;
    //   $res_hash = $this->getHash($result, $key);
    //   $url = $host.$res_hash."/".$width."x".$height."/".$media;
    // }

    $tag = '<img
    src="'.$url.'"
    data-camus-toolbar-position="'.$position.'"
    alt="'.$alt.'"
    onerror="this.onerror=null;this.src=\'/bundles/camusassets/images/placeholder.jpg\'"
    data-camus-image /> ';

    return $tag;
  }

  public function getHash($result, $key){
    if($key == "unsafe"){
      return $key;
    }

    $hash1 = hash_hmac('sha1', $result, $key, true);
    $hash = strtr(base64_encode($hash1), '+/', '-_');
    return $hash;
  }
  public function statsService($league,$template,$season = "",$seasonRound = "",$round="",$limit = 6){
    $hostServices = $this->container->getParameter('servicesMT');
    $service = array();
    $postdata = http_build_query(
      array(
        'data' => 'stats',
        'league' => $league
      )
    );
    $opts = array('http' =>
      array(
        'method'  => 'POST',
        'header'  => 'Content-type: application/x-www-form-urlencoded',
        'content' => $postdata
      )
    );

    $context  = stream_context_create($opts);
    $resultServices = @file_get_contents($hostServices, false, $context);
    $resultServices = json_decode($resultServices,true);
    $arrayConverterTemplate = array(
      "league_standings" => "standings",
      "league_calendar" => "calendar",
      "league_players_scorer" => "playerMostGoaler",
      "league_players_defender" => "playerMostBlocking",
      "league_players_successful_passes" => "playerPassesMostSuccessful",
      "league_goal_keeper_saves" => "goalkeeperMostSaves",
      "league_players_expelled" => "playerMostExpulsions",
      "league_players_cards" => "playerMostAmonstations",
      "league_teams_scorer" => "teamMostGoalers",
      "league_teams_defender" => "teamMostDefensive",
      "league_teams_expelled" => "teamExpulsions",
      "league_teams_cards" => "teamAmonestations"
    );
    $idNameTable = $arrayConverterTemplate[$template];
    $nameTable = "";
    $leagueInfo = "";
    $seasonInfo = "";
    $roundInfo = "";
    $unique = true;
    if (strcmp($idNameTable, "calendar") === 0) {
      if(isset($resultServices["code"])){
        if($resultServices["code"] == 200){
          $itemLeague = [];
          foreach ($resultServices["data"] as $keyL => $valueL) {
            if($valueL["id"] == $league){
              $leagueInfo = $valueL["name"];
              $itemLeague = $valueL;
            }
          }
          $itemSeason = [];
          if(empty($season)){
            foreach ($itemLeague["seasons"] as $key => $valueM) {
              if($unique) {
                foreach ($valueM["stats"] as $key => $valueN) {
                  if($valueN["id"] == $idNameTable){
                    $serviceUrl = $valueN['url'];
                    $unique = false;
                  }
                }
              }
            }

            $urlS = $serviceUrl;
            if(!empty($round)){
              $urlS = $urlS."&round=".$round;
              $roundInfo = $round;
            }
            if(!empty($seasonRound)){
              $urlS = $urlS."&seasonRound=".$seasonRound;
              $seasonRoundInfo = $seasonRound;
            }
            $serviceData = json_decode(@file_get_contents($urlS), true);
          } else {
            foreach ($resultServices["data"][0]["seasons"] as $keySo => $valueSo) {
              if($valueSo["id"] == $season){
                $itemSeason = $valueSo;
                $seasonInfo = $valueSo["name"];
              }
            }
            foreach ($itemSeason["stats"] as $keySeason => $valueSeason) {
              if($valueSeason["id"] == $idNameTable){
                $urlS = $valueSeason["url"];
                if(!empty($round)){
                  $urlS = $urlS."&round=".$round;
                  $roundInfo = $round;
                }
                if(!empty($seasonRound)){
                  $urlS = $urlS."&seasonRound=".$seasonRound;
                  $seasonRoundInfo = $seasonRound;
                }
                $serviceData = json_decode(@file_get_contents($urlS), true);
                $nameTable = $valueSeason["name"];
              }
            }
          }
        }
      }

      foreach ($serviceData["dimensions"]["bundle"] as $keyB => $valueBundle) {
        if ($valueBundle["name"] == "seasonRound") {
          $serviceData = file_get_contents($urlS . "&seasonRound=" . $valueBundle["values"][0]["id"], false);
          $serviceData = json_decode($serviceData,true);
          break;
        }
      }

      $isPhase = true;
      foreach ($serviceData["dimensions"]["bundle"] as $keyB => $valueBundle) {
        foreach ($valueBundle["values"] as $keyV => $valueValues) {
          if (strtolower($valueValues["label"]) == 'ida') {
            $serviceOne = file_get_contents($urlS . "&round=" . $valueBundle["values"][$keyV]["id"], false);
            $serviceOne = json_decode($serviceOne,true);

            $serviceTwo = file_get_contents($urlS . "&round=" . $valueBundle["values"][$keyV + 1]["id"], false);
            $serviceTwo = json_decode($serviceTwo,true);

            $isPhase = false;

            return array($serviceOne["calendar"]["data"],"",$serviceTwo["calendar"]["data"]);
          }
        }
      }

      if ($isPhase == true){
        return array($serviceData["calendar"]["data"],"");
      }
    } else {
      if(isset($resultServices["code"])){
        if($resultServices["code"] == 200){
          $itemLeague = [];
          foreach ($resultServices["data"] as $keyL => $valueL) {
            if($valueL["id"] == $league){
              $leagueInfo = $valueL["name"];
              $itemLeague = $valueL;
            }
          }
          $itemSeason = [];
          if(empty($season)){
            $itemSeason = $valueL["seasons"][0];
            $seasonInfo = $valueL["seasons"][0]["name"];
          }else{
            foreach ($resultServices["data"][0]["seasons"] as $keySo => $valueSo) {
              if($valueSo["id"] == $season){
                $itemSeason = $valueSo;
                $seasonInfo = $valueSo["name"];
              }
            }
          }
          foreach ($itemSeason["stats"] as $keySeason => $valueSeason) {
            if($valueSeason["id"] == $idNameTable){
              $urlS = $valueSeason["url"];
              if($idNameTable == "standings"){
                $resultData = json_decode(@file_get_contents($urlS), true);
                $lastRound = $resultData['dimensions']['configuration']['round'];
                foreach ($resultData['dimensions']['bundle'] as $keyB => $valueB) {
                  if ($valueB['name'] == 'round') {
                    $roundsCol = array_column($valueB['values'], 'id');
                  }
                }
                if (array_search($round, $roundsCol) === false) {
                  $round = $lastRound;

                  $urlS = $urlS."&round=".$round;
                  $roundInfo = $round;
                } else {
                  $urlS = $urlS."&round=".$round;
                  $roundInfo = $round;
                }

                $serviceData = json_decode(@file_get_contents($urlS), true);
                $nameTable = $valueSeason["name"];
              } else {
                $serviceData = json_decode(@file_get_contents($urlS), true);
                $nameTable = $valueSeason["name"];
              }
            }
          }
        }
      }
      if(isset($serviceData['statsTable'])){
        $orderedData = $serviceData['statsTable']['data']['rows'];
        /*if($idNameTable == 'standings') {
          $service = $serviceData['statsTable']['data']['rows'];
        } else {
          foreach(array_slice($orderedData, 0, $limit, true) as $key => $valor) {
            array_push($service,$serviceData['statsTable']['data']['rows'][$key]);
          }
        }*/
        foreach(array_slice($orderedData, 0, $limit, true) as $key => $valor) {
          array_push($service,$serviceData['statsTable']['data']['rows'][$key]);
        }
      };
      return array($service,$nameTable,$leagueInfo,$seasonInfo,$roundInfo);
    }
  }

  public function getSeasonRoundData($leagueId, $season){
    $seasonRoundData = null;
    if($season != null){
      $resultServices = json_decode(file_get_contents('https://mictlan.mediotiempo.com/v1/soccer/competitions/'.$leagueId.'/calendar'),true);
      foreach ($resultServices['dimensions']['bundle'][0]['values'] as $key => $seasonValue) {
        $seasonName = strtolower(preg_replace('/\s+/', '-',$seasonValue['label']));
        if($season==$seasonName){
          $seasonId = $seasonValue['id'];
        }
      }
      $urlServices = 'https://mictlan.mediotiempo.com/v1/soccer/competitions/'.$leagueId.'/calendar?season='.$seasonId;
      $resultServices = json_decode(file_get_contents($urlServices),true);
    }else{
      $urlServices = 'https://mictlan.mediotiempo.com/v1/soccer/competitions/'.$leagueId.'/calendar';
      $resultServices = json_decode(file_get_contents($urlServices),true);
    }
    foreach ($resultServices['dimensions']['bundle'] as $keyB => $seasonBundle) {
      if($seasonBundle['name']=='seasonRound'){
        $seasonRoundData = $seasonBundle['values'];
      }
    }
    return $seasonRoundData;
  }

  public function getRoundData($leagueId, $season, $round, $seasonRound){
    if(preg_match('/jornada/',$seasonRound) > 0) {
      $round = $seasonRound;
      $seasonRound = null;
      // $seasonRound = 'regular';
    }
    /*if($seasonRound == null) {
      $seasonRound = 'regular';
    } elseif (preg_match('/jornada/',$seasonRound) > 0) {
      $round = $seasonRound;
      $seasonRound = 'regular';
    }*/
    if($season != null) {
      $resultServices = json_decode(file_get_contents('https://mictlan.mediotiempo.com/v1/soccer/competitions/'.$leagueId.'/calendar'),true);
      foreach ($resultServices['dimensions']['bundle'] as $key => $bundleValue) {
        if($bundleValue['name']=='season') {
          foreach ($bundleValue['values'] as $key => $seasonValue) {
            $seasonName = strtolower(preg_replace('/\s+/', '-',$seasonValue['label']));
            if($season==$seasonName) {
              $seasonId = $seasonValue['id'];
            }
          }
        }
      }
      $urlServices = 'https://mictlan.mediotiempo.com/v1/soccer/competitions/'.$leagueId.'/calendar?season='.$seasonId;
      $resultServices = json_decode(file_get_contents($urlServices),true);
    } else {
      $urlServices = 'https://mictlan.mediotiempo.com/v1/soccer/competitions/'.$leagueId.'/calendar';
      $resultServices = json_decode(file_get_contents($urlServices),true);
    }
    $seasonRoundId = null;
    foreach ($resultServices['dimensions']['bundle'] as $keyB => $seasonBundle) {
      if($seasonBundle['name']=='seasonRound'){
        if($seasonRound == null) {
          $seasonRoundId = $seasonBundle['values'][0]['id'];
        } /*elseif (preg_match('/jornada/',$seasonRound) > 0) {
          foreach ($seasonBundle['values'] as $keyV => $seasonValues) {
            if(str_replace("-"," ",strtolower($seasonValues['label']))==str_replace("-"," ",$seasonRound)){
              $seasonRoundId = $seasonValues['id'];
            }
          }
        } */else {
          foreach ($seasonBundle['values'] as $keyV => $seasonValues) {
            if(str_replace("-"," ",strtolower($seasonValues['label']))==str_replace("-"," ",$seasonRound)){
              $seasonRoundId = $seasonValues['id'];
            }
          }
        }
        /*foreach ($seasonBundle['values'] as $keyV => $seasonValues) {
          if(strtolower($seasonValues['label'])==str_replace("-"," ",$seasonRound)){
            $seasonRoundId = $seasonValues['id'];
          }
        }*/
      }
    }
    if($seasonRoundId != null) {
      if($season != null) {
        $urlServices = $urlServices.'&seasonRound='.$seasonRoundId;
      } else {
        $urlServices = $urlServices.'?seasonRound='.$seasonRoundId;
      }
    }
    $resultServices = json_decode(file_get_contents($urlServices),true);
    foreach ($resultServices['dimensions']['bundle'] as $keyB => $seasonBundle) {
      if($seasonBundle['name']=='round'){
        $roundData = $seasonBundle['values'];
      } else {
        $roundData = null;
      }
    }
    $actualRoundLabel = '';
    if(preg_match('/jornada/',$round) > 0) {
      if($season != null) {
        $actualRoundLabel = str_replace("-"," ",$round);
      }
    } else {
      $resultServices = json_decode(file_get_contents($urlServices),true);

      foreach ($resultServices['dimensions']['bundle'] as $key => $bundleValue) {
        if($bundleValue['name']=='round') {
          foreach ($bundleValue['values'] as $key => $seasonValue) {
            if($resultServices['dimensions']['configuration']['round']==$seasonValue['id']) {
              $actualRoundLabel = $seasonValue['label'];
            }
          }
        }
      }
      // die;
      /*if($season != null) {
        foreach ($resultServices['dimensions']['bundle'] as $key => $bundleValue) {
          if($bundleValue['name']=='season') {
            foreach ($bundleValue['values'] as $key => $seasonValue) {
              $seasonName = strtolower(preg_replace('/\s+/', '-',$seasonValue['label']));
              if($season==$seasonName) {
                $seasonId = $seasonValue['id'];
              }
            }
          }
        }
        $urlServices = 'https://mictlan.mediotiempo.com/v1/soccer/competitions/'.$leagueId.'/standings?season='.$seasonId;
        $resultServices = json_decode(file_get_contents($urlServices),true);
        if (isset($resultServices['dimensions']['configuration']['round'])) {
          $actualRound = $resultServices['dimensions']['configuration']['round'];
        }
        foreach ($resultServices['dimensions']['bundle'] as $keyB => $seasonBundle) {
          if($seasonBundle['name']=='round'){
            $roundHistory = $seasonBundle['values'];
          }
        }
        if(array_search($actualRound, array_column($roundHistory, 'id')) !== false) {
          $actualRoundLabel = $roundHistory[array_search($actualRound, array_column($roundHistory, 'id'))]['label'];
        }
      } else {
        $urlServices = 'https://mictlan.mediotiempo.com/v1/soccer/competitions/'.$leagueId.'/standings';
        $resultServices = json_decode(file_get_contents($urlServices),true);
        if (isset($resultServices['dimensions']['configuration']['round'])) {
          $actualRound = $resultServices['dimensions']['configuration']['round'];
        }
        foreach ($resultServices['dimensions']['bundle'] as $keyB => $seasonBundle) {
          if($seasonBundle['name']=='round'){
            $roundHistory = $seasonBundle['values'];
          }
        }
        if(array_search($actualRound, array_column($roundHistory, 'id')) !== false) {
          $actualRoundLabel = $roundHistory[array_search($actualRound, array_column($roundHistory, 'id'))]['label'];
        }
      }*/
    }

    if(empty($actualRoundLabel)) {
      return array($roundData);
    } elseif (!empty($actualRoundLabel)) {
      return array($roundData,$actualRoundLabel);
    }
  }

  public function getUrlStadistics(){
    $encodedData = explode('/', $_SERVER['REQUEST_URI']);
    $first = null;
    $second = null;
    $third = null;
    if(isset($encodedData[1])){
      $first = $encodedData[1];
    }
    if(isset($encodedData[2])){
      $second = $encodedData[2];
    }
    if(isset($encodedData[3])){
      $third = $encodedData[3];
    }
    $url = $first."/".$second."/".$third;
    return $url;
  }

  public function getStatsURL($leagueId,$stat){

    $hostServices = $this->container->getParameter('servicesMT');
    $service = array();
    $encodedData = explode('/', $_SERVER['REQUEST_URI']);
    $seasons = "";
    if (isset($encodedData[4])) {
      $seasons = str_replace("-"," ",$encodedData[4]);
    }
    $seasonRound = "";
    if (isset($encodedData[5])) {
      $seasonRound = str_replace("-"," ",$encodedData[5]);
    }
    $round = "";
    if (isset($encodedData[6])) {
      $round = str_replace("-"," ",$encodedData[6]);
    }
    $statsServices = array(
      'automatic_standings' => 'standings',
      'automatic_players_offensive' => 'playerMostGoaler' ,
      'automatic_players_defensive' => 'playerMostBlocking',
      'automatic_players_successful_passes' => 'playerPassesMostSuccessful',
      'automatic_goal_keeper_saves' => 'goalkeeperMostSaves',
      'automatic_players_expulsions' => 'playerMostExpulsions',
      'automatic_players_amonstations' => 'playerMostAmonstations',
      'automatic_teams_offensive' => 'teamMostGoalers',
      'automatic_teams_defensive' => 'teamMostDefensive',
      'automatic_teams_expulsions' => 'teamExpulsions',
      'automatic_teams_amonstations' => 'teamAmonestations',
      'automatic_calendar' => 'calendar'
    );
    $nameStat = $statsServices[$stat];

    if(!empty($leagueId)){
      $postdataStats = http_build_query(
        array(
          'data' => 'stats',
          'league' => $leagueId
        )
      );
      $optsStats = array('http' =>
        array(
          'method'  => 'POST',
          'header'  => 'Content-type: application/x-www-form-urlencoded',
          'content' => $postdataStats
        )
      );

      $context  = stream_context_create($optsStats);
      $resultServicesStats = file_get_contents($hostServices, false, $context);
      $resultServicesStats = json_decode($resultServicesStats,true);
    }
    $serviceUrl = "";
    switch ($stat) {
      case 'automatic_standings':
        if(isset($resultServicesStats["code"])){
          if($resultServicesStats["code"] == 200){
            foreach ($resultServicesStats["data"] as $keyL => $valueL) {
              if($valueL["id"] == $leagueId){
                if (!empty($seasons)) {
                  foreach ($resultServicesStats["data"][0]['seasons'] as $keySts => $valueSts) {
                    if(str_replace("-"," ",strtolower($valueSts["name"])) == $seasons){
                      foreach ($valueSts['stats'] as $keySts => $valueSts) {
                        if($valueSts["id"] == $nameStat){
                          $serviceUrl = $valueSts['url'];
                        }
                      }
                    }
                  }
                } else {
                  foreach ($resultServicesStats["data"][0]['seasons'][0]['stats'] as $keySts => $valueSts) {
                    if($valueSts["id"] == $nameStat){
                      $serviceUrl = $valueSts['url'];
                    }
                  }
                }
              }
            }
          }
        }
        if(!empty($seasonRound)){
          $resultServicesRound = file_get_contents($serviceUrl, false);
          $resultServicesRound = json_decode($resultServicesRound,true);
          $lastRound = $resultServicesRound["dimensions"]["configuration"]["round"];

          foreach ($resultServicesRound["dimensions"]["bundle"] as $keyB => $valueBundle) {
            if($valueBundle['name'] == 'round'){
              $roundColId = array_column($valueBundle['values'], 'id');
              $roundColLabel = array_column($valueBundle['values'], 'label');
            }
          }

          if (array_search($seasonRound,array_map('strtolower', $roundColLabel)) > array_search($lastRound,$roundColId) || array_search($seasonRound,array_map('strtolower', $roundColLabel)) === false){
            $serviceUrl = $serviceUrl . "&round=" . $lastRound;
          } else {
            $roundIndex = array_search($seasonRound,array_map('strtolower', $roundColLabel));
            $serviceUrl = $serviceUrl . "&round=" . $roundColId[$roundIndex];
          }
        }
        break;

      case 'automatic_players_offensive':
      case 'automatic_players_defensive':
      case 'automatic_players_successful_passes':
      case 'automatic_goal_keeper_saves':
      case 'automatic_players_expulsions':
      case 'automatic_players_amonstations':
      case 'automatic_teams_offensive':
      case 'automatic_teams_defensive':
      case 'automatic_teams_expulsions':
      case 'automatic_teams_amonstations':
        if(isset($resultServicesStats["code"])){
          if($resultServicesStats["code"] == 200){
            foreach ($resultServicesStats["data"] as $keyL => $valueL) {
              if($valueL["id"] == $leagueId){
                if (!empty($seasons)) {
                  foreach ($valueL["seasons"] as $keySns => $valueSns) {
                    if(strtolower($valueSns["name"]) == $seasons){
                      foreach ($valueSns['stats'] as $keySts => $valueSts) {
                        if($valueSts["id"] == $nameStat){
                          $serviceUrl = $valueSts['url'];
                        }
                      }
                    }
                  }
                }else{
                  foreach ($valueL["seasons"][0]["stats"] as $key => $value) {
                    if($value["id"] == $nameStat){
                      $serviceUrl = $value['url'];
                    }
                  }
                }
              }
            }
          }
        }
        break;

      case 'automatic_calendar':
        $unique = true;
        $serviceUrlElse = "";

        if(isset($resultServicesStats["code"])) {
          if($resultServicesStats["code"] == 200){
            foreach ($resultServicesStats["data"] as $keyL => $valueL) {
              if($valueL["id"] == $leagueId){
                if (!empty($seasons)) {
                  foreach ($valueL["seasons"] as $keySns => $valueSns) {
                    if(strtolower(str_replace("-"," ",$valueSns["name"])) == $seasons){
                      foreach ($valueSns['stats'] as $keySts => $valueSts) {
                        if($valueSts["id"] == $nameStat){
                          $serviceUrl = $valueSts['url'];
                        }
                      }
                    }
                  }
                } else {
                  foreach ($valueL["seasons"] as $key => $valueM) {
                    if($unique){
                      foreach ($valueM["stats"] as $key => $valueN) {
                        if($valueN["id"] == $statsServices[$stat]){
                          $serviceUrl = $valueN['url'];
                          $unique = false;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        if(!empty($seasonRound)) {
          $resultServicesRound = file_get_contents($serviceUrl, false);
          $resultServicesRound = json_decode($resultServicesRound,true);

          foreach ($resultServicesRound["dimensions"]["bundle"] as $keyB => $valueBundle) {
            if($valueBundle["name"] == 'seasonRound'){
              foreach ($valueBundle["values"] as $keyV => $valueV) {
                if(strtolower($valueV["label"]) == $seasonRound){
                  $serviceUrl = $serviceUrl . "&seasonRound=" . $valueV["id"];
                }
              }
            }
          }
        } else {
          $resultServicesRound = file_get_contents($serviceUrl, false);
          $resultServicesRound = json_decode($resultServicesRound,true);

          foreach ($resultServicesRound["dimensions"]["bundle"] as $keyB => $valueBundle) {
            if($valueBundle["name"] == 'seasonRound'){
              $serviceUrl = $serviceUrl . "&seasonRound=" . $valueBundle["values"][0]["id"];
            }
          }
          $resultServicesRound = file_get_contents($serviceUrl, false);
          $resultServicesRound = json_decode($resultServicesRound,true);

          $uniqueElse = true;
          if(isset($resultServicesStats["code"])) {
            if($resultServicesStats["code"] == 200){
              foreach ($resultServicesStats["data"] as $keyL => $valueL) {
                if($valueL["id"] == $leagueId){
                  if (!empty($seasons)) {
                    foreach ($valueL["seasons"] as $keySns => $valueSns) {
                      if(strtolower(str_replace("-"," ",$valueSns["name"])) == $seasons){
                        foreach ($valueSns['stats'] as $keySts => $valueSts) {
                          if($valueSts["id"] == $nameStat){
                            $serviceUrlElse = $valueSts['url'];
                          }
                        }
                      }
                    }
                  } else {
                    foreach ($valueL["seasons"] as $key => $valueM) {
                      if($uniqueElse){
                        foreach ($valueM["stats"] as $key => $valueN) {
                          if($valueN["id"] == 'standings'){
                            $serviceUrlElse = $valueN['url'];
                            $uniqueElse = false;
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          $resultServicesRound = file_get_contents($serviceUrlElse, false);
          $resultServicesRound = json_decode($resultServicesRound,true);

          $seasonRoundList = false;
          foreach ($resultServicesRound["dimensions"]["bundle"] as $keyB => $valueBundle) {
            if($valueBundle["name"] == 'seasonRound'){
              $seasonRoundList = true;
            }
          }

          if($seasonRoundList == true) {
            $serviceUrl = $serviceUrl . "&seasonRound=" . $resultServicesRound["dimensions"]["configuration"]["round"];
          } else {
            $serviceUrl = $serviceUrl . "&round=" . $resultServicesRound["dimensions"]["configuration"]["round"];
          }
        }
        if(!empty($round)) {
          $resultServicesRound = file_get_contents($serviceUrl, false);
          $resultServicesRound = json_decode($resultServicesRound,true);

          foreach ($resultServicesRound["dimensions"]["bundle"] as $keyB => $valueBundle) {
            if($valueBundle["name"] == 'round'){
              foreach ($valueBundle["values"] as $keyV => $valueV) {
                if(strtolower($valueV["label"]) == $round){
                  $serviceUrl = $serviceUrl . "&round=" . $valueV["id"];
                }
              }
            }
          }
        }

        break;

      default:
        // code...
        break;
    }
    if($serviceUrl != ""){
      if ($stat == 'automatic_calendar') {
        $service = file_get_contents($serviceUrl, false);
        $service = json_decode($service,true);
        $flag = true;

        foreach ($service["dimensions"]["bundle"] as $keyB => $valueBundle) {
          if($valueBundle["name"] == 'round'){
            foreach ($valueBundle["values"] as $keyV => $valueV) {
              if(strtolower($valueV["label"]) == 'ida'){
                $serviceOne = file_get_contents($serviceUrl . "&round=" . $service["dimensions"]["bundle"][2]["values"][0]["id"], false);
                $serviceOne = json_decode($serviceOne,true);

                $serviceTwo = file_get_contents($serviceUrl . "&round=" . $service["dimensions"]["bundle"][2]["values"][1]["id"], false);
                $serviceTwo = json_decode($serviceTwo,true);

                return array($serviceOne["calendar"]["data"],$service["calendar"]["metadata"]["headers"],$serviceTwo["calendar"]["data"]);
                $flag = false;
              }
            }
          }
        }

        if ($flag == true) {
          return array($service["calendar"]["data"],$service["calendar"]["metadata"]["headers"]);
        }
      } else {
        $service = file_get_contents($serviceUrl, false);
        $service = json_decode($service,true);

        return array($service["statsTable"]["data"]["rows"],$service);
      }
    }else{
      return $service;
    }
  }

  public function getTickerCaliente(){
    $hostMictlan = $this->container->getParameter('servicesMictlan');
    $imagesMictlan = $this->container->getParameter('imagesMictlan');
    $resultServices = @file_get_contents($hostMictlan."ticker");
    $resultServices = json_decode($resultServices,true);
    $service = array();
    $i = 0;
    foreach ($resultServices["matches"] as $keyS => $valueS) $service[]["competition"] = $valueS["competition"];
    $service = $this->super_unique($service,"competition");
    foreach ($resultServices["matches"] as $keyS => $valueS) {
      $key = array_search($valueS["competition"],array_column($service,"competition"));
      if (!array_key_exists('logo', $service[$key])) $service[$key]["logo"] = "";
      if (!array_key_exists('matches', $service[$key])) $service[$key]["matches"] = array();
      $service[$key]["logo"] = "https://static.mediotiempo.com/0x50/".$valueS["competition_logo"];
      switch ($valueS["match_status"]) {
        case 'Terminado':
        if (!array_key_exists('terminado', $service[$key]["matches"])) $service[$key]["matches"]["terminado"] = array();
        $service[$key]["matches"]["terminado"][] = $valueS;
        break;
        case 'Jugando':
        if (!array_key_exists('jugando', $service[$key]["matches"])) $service[$key]["matches"]["jugando"] = array();
        $service[$key]["matches"]["jugando"][] = $valueS;
        break;
        case 'Programado':
        if (!array_key_exists('programado', $service[$key]["matches"])) $service[$key]["matches"]["programado"] = array();
        $service[$key]["matches"]["programado"][] = $valueS;
        break;
        default:
        break;
      }
    }
    return $service;
  }

  public function super_unique($array,$key){
    $temp_array = [];
    foreach ($array as &$v) {
      if (!isset($temp_array[$v[$key]]))
      $temp_array[$v[$key]] =& $v;
    }
    $array = array_values($temp_array);
    return $array;
  }

  public function transformDate($startTime){
    date_default_timezone_set("America/Mexico_City");
    $date = strtotime($startTime);
    $dataDate = array();
    $dataDate["day"] = date('M j', $date);
    $dataDate["hour"] = date('H:i', $date);
    $dataDate["hourComplete"] = date('H:i:s', $date);
    return $dataDate;
  }
  public function getCalienteUrl($id){
    $urlCaliente = $this->container->getParameter('calienteUrl');
    return $urlCaliente.$id;
  }

  public function getAutomaticMam($matchId){
    $hostMictlan = $this->container->getParameter('servicesMictlan');
    $resultServices = @file_get_contents($hostMictlan."soccer/matches/".$matchId."/app", false);
    $resultServices = json_decode($resultServices,true);
    $minUrl = "";
    $matchOptaId = "";
    $competitionOptaId = "";
    $seasonOptaId = "";
    $service = array();
    if(isset($resultServices["matchLineup"])){
      if(isset($resultServices["matchLineup"]["match"])){
        $matchOptaId = $resultServices["matchLineup"]["match"]["match_opta_id"];
        $competitionOptaId = $resultServices["matchLineup"]["match"]["competition_opta_id"];
        $seasonOptaId = $resultServices["matchLineup"]["match"]["season_opta_id"];
      }
    }
    if(!empty($matchOptaId) && !empty($competitionOptaId) && !empty($seasonOptaId)){
      $xml = simplexml_load_file("http://static.mediotiempo.com/ulama/opta/push/$competitionOptaId/$seasonOptaId/F13/commentary-$competitionOptaId-$seasonOptaId-$matchOptaId-es.xml");
      $i = 0;
      foreach ($xml->message as $minuto) {
        $service[$i]["type"] = "nd_rows_detail";
        $service[$i]["template"] = "row_match";
        $service[$i]["title"] = "min. ".$minuto["time"];
        $service[$i]["body"] = $minuto["comment"];
        $service[$i]["headingColorTheme"] = "rgba(252,238,33,1)";
        $i++;
      }
    }

    return $service;
  }

  public function dateConvert($date, $locale = "es_ES"){
    setlocale(LC_TIME, $locale);
    $newDate = new \DateTime($date);
    $dateFormat = strftime("%a %e %Y", $newDate->getTimestamp());

    return $dateFormat;
  }

  public function getUrlResumen($matchId){
    $hostMictlan = $this->container->getParameter('servicesMictlan');
    return $hostMictlan."soccer/matches/".$matchId."/goals";
  }

  public function getMatchData($matchId){
    $hostMictlan = $this->container->getParameter('servicesMictlan');
    return $hostMictlan."ticker/match/".$matchId;
  }

  public function getImageMictlan($url){
    $imageMictlan = $this->container->getParameter('imagesMictlan');
    return $imageMictlan.$url;
  }
  public function buildExternalOlama($matchId, $text){
    return "<a href='/external/ulama/".$matchId."'>".$text."</a>";
  }
  public function existFile($file){
    return (file_exists($file));
  }
  public function includeFile($file){
    return file_get_contents($file);
  }
}
?>
