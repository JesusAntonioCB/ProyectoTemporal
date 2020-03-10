<?php

namespace App\Camus\FrontEndBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Session;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Camus\FrontEndBundle\Fixture\MDResponse;
use Camus\AssetsBundle\Twig\ModelModuleExtension;
use Symfony\Component\HttpFoundation\Response;


class DefaultController extends Controller
{

  /**
  * @Route("/")
  */
  public function indexAction(){
    $dynamic = '/';
    $number = random_int(0, 100);

    return $this -> render ( 'base/base.html.twig' , [
        'number' => $number ,
    ]);
    // $service = $this->postFromApi($dynamic, array());
    // $metas = (isset($service->data->meta)) ? $service->data->meta : "";
    // $keywords = (isset($service->data->keywords)) ? $service->data->keywords : "";
    // $boardColor = (isset($service->data->headerBackground)) ? $service->data->headerBackground : '#b10b1f';
    // if($service != false){
    //   $modules = $this->getBoardFromApi($service);
    //
    //   if($modules == null){
    //     throw $this->createNotFoundException();
    //   }
    //   $response = $this->countAds($modules);
    //   $modules = $response['modules'];
    //   $ads = $response['ads'];
    //   $tagContainer = array(
    //     'section' => '/',
    //     'subsection' => '',
    //     'subsubsection' => ''
    //   );
    //   $arrayCss = array();
    //   $resultFileCss = array();
    //   $this->getListModules($modules,$arrayCss);
    //   if(count($arrayCss)){
    //     $resultFileCss = array_values(array_unique($arrayCss));
    //   }
    //   $response = $this->render('@CamusAssets/Content/content.html.twig', array(
    //     'meta' => $metas,
    //     'keywords' => $keywords,
    //     'modules' => $modules,
    //     'headerType' => 0,
    //     'currentSection' => 'Home',
    //     'ads' => $ads,
    //     'gtm' => $tagContainer,
    //     'boardColor' => $boardColor,
    //     'contentLayer' => $service->data,
    //     'fileCSS' => $resultFileCss,
    //   ));
    //   $response->setSharedMaxAge(60);
    //   return $response;
    // }
    // else{
    //   throw $this->createNotFoundException();
    // }
  }

  /**
  * @Route("/getPlayerScores/{idPlayer}/{idCompetition}")
  */
  public function getStatPlayer(Request $request){
    $idPlayer = $request->get('idPlayer');
    $idCompetition = $request->get('idCompetition');
    $hostMictlan = $this->container->getParameter('servicesMictlan');
    $resultServices = json_decode(file_get_contents($hostMictlan."soccer/players/".$idPlayer."/stats?seasonRoundName=todos&competitionId=".$idCompetition), true);
    $data = $resultServices['statsTable']['data']['rows'];
    $responseArray = array();
    foreach ($data as $key => $dataValues) {
      array_push($responseArray, $dataValues);
    }
    return new JsonResponse($responseArray);
  }

  /**
  * @Route("/get-ticker")
  */
  public function getTicker(Request $request){
    $service = '{"matches":[{"server_time":"2019-01-06T18:57:24Z","diff_seconds":3306.005202,"match_id":"1b96944b-64b6-4648-8190-7091ac7128f4","sport_slug":"soccer","competition_id":"9d6460c9-47d8-4017-9f5d-70d79017e244","competition":"LIGAMX","competition_logo":"bs/mt/sports/production/soccer/competitions/9d6460c9-47d8-4017-9f5d-70d79017e244.png","season":"Clausura 2019","season_round":"Regular","round":"Jornada 1","venue":"Olímpico de CU","match_date":"2019-01-06T18:00:00Z","match_status":"Jugando","home_team_id":"14b3b809-fe4f-47e7-bb26-59cdf145878d","home_team_name":"Pumas","home_team_acronym":null,"home_team_logo":"bs/mt/sports/production/soccer/teams/14b3b809-fe4f-47e7-bb26-59cdf145878d.png","away_team_id":"401375b5-f4a2-4654-98af-f2842834d5a2","away_team_name":"Veracruz","away_team_acronym":null,"away_team_logo":"bs/mt/sports/production/soccer/teams/401375b5-f4a2-4654-98af-f2842834d5a2.png","current_period":"Primer Tiempo","current_period_start_time":"2019-01-06T18:02:18Z","current_period_stop_time":"2019-01-06T18:49:39Z","home_team_score":1,"home_team_shoot_out_score":null,"away_team_score":0,"away_team_shoot_out_score":null,"home_team_odds":"-154","home_team_odds_money":1.65,"home_team_bet_id":"Mzk0MzY3MjA5OjEzLzIwOjow","away_team_odds":"+650","away_team_odds_money":7.5,"away_team_bet_id":"Mzk0MzY3MjA3OjEzLzI6OjA","draw_odds":"+220","draw_odds_money":3.2,"draw_bet_id":"Mzk0MzY3MjA4OjExLzU6OjA"},{"server_time":"2019-01-06T18:57:24Z","diff_seconds":1535.005202,"match_id":"b0bbf87c-142f-4688-8398-2bfecf89dedf","sport_slug":"soccer","competition_id":"3ab784a6-f017-4769-a5f3-a11dffd83870","competition":"La Liga Española","competition_logo":"bs/mt/sports/production/soccer/competitions/3ab784a6-f017-4769-a5f3-a11dffd83870.png","season":"2018-2019","season_round":"Regular","round":"Jornada 18","venue":null,"match_date":"2019-01-06T17:30:00Z","match_status":"Jugando","home_team_id":"a179e03b-df77-498d-ad44-0d12353bc8fb","home_team_name":"Real Madrid","home_team_acronym":null,"home_team_logo":"bs/mt/sports/production/soccer/teams/a179e03b-df77-498d-ad44-0d12353bc8fb.png","away_team_id":"b576e8c3-2f1e-4c68-8707-684416029768","away_team_name":"Real Sociedad","away_team_acronym":null,"away_team_logo":"bs/mt/sports/production/soccer/teams/b576e8c3-2f1e-4c68-8707-684416029768.png","current_period":"Segundo Tiempo","current_period_start_time":"2019-01-06T18:31:49Z","current_period_stop_time":null,"home_team_score":0,"home_team_shoot_out_score":null,"away_team_score":1,"away_team_shoot_out_score":null,"home_team_odds":"+155","home_team_odds_money":2.55,"home_team_bet_id":"Mzg4NDMyNTk3OjMxLzIwOjow","away_team_odds":"+200","away_team_odds_money":3.0,"away_team_bet_id":"Mzg4NDMyNTk1OjIvMTo6MA","draw_odds":"+200","draw_odds_money":3.0,"draw_bet_id":"Mzg4NDMyNTk2OjIvMTo6MA"},{"server_time":"2019-01-06T18:57:24Z","diff_seconds":null,"match_id":"c0cbd91c-2b9b-4bbf-8686-b522175d848c","sport_slug":"soccer","competition_id":"3ab784a6-f017-4769-a5f3-a11dffd83870","competition":"La Liga Española","competition_logo":"bs/mt/sports/production/soccer/competitions/3ab784a6-f017-4769-a5f3-a11dffd83870.png","season":"2018-2019","season_round":"Regular","round":"Jornada 18","venue":null,"match_date":"2019-01-06T19:45:00Z","match_status":"Programado","home_team_id":"b84a1913-8bd1-4506-92a8-96a0cc2c2fae","home_team_name":"Getafe","home_team_acronym":null,"home_team_logo":"bs/mt/sports/production/soccer/teams/b84a1913-8bd1-4506-92a8-96a0cc2c2fae.png","away_team_id":"a0042728-b9cc-4046-865a-1d12f86872e6","away_team_name":"Barcelona","away_team_acronym":null,"away_team_logo":"bs/mt/sports/production/soccer/teams/a0042728-b9cc-4046-865a-1d12f86872e6.png","current_period":null,"current_period_start_time":null,"current_period_stop_time":null,"home_team_score":0,"home_team_shoot_out_score":null,"away_team_score":0,"away_team_shoot_out_score":null,"home_team_odds":"+650","home_team_odds_money":7.5,"home_team_bet_id":"Mzg4NDM0NTA1OjEzLzI6OjA","away_team_odds":"-239","away_team_odds_money":1.42,"away_team_bet_id":"Mzg4NDM0NTAzOjIxLzUwOjow","draw_odds":"+400","draw_odds_money":5.0,"draw_bet_id":"Mzg4NDM0NTA0OjQvMTo6MA"},{"server_time":"2019-01-06T18:57:24Z","diff_seconds":null,"match_id":"71bfb93d-c13a-4191-8a63-8015ab9d8b03","sport_slug":"soccer","competition_id":"9d6460c9-47d8-4017-9f5d-70d79017e244","competition":"LIGAMX","competition_logo":"bs/mt/sports/production/soccer/competitions/9d6460c9-47d8-4017-9f5d-70d79017e244.png","season":"Clausura 2019","season_round":"Regular","round":"Jornada 1","venue":null,"match_date":"2019-01-06T22:00:00Z","match_status":"Programado","home_team_id":"0c09332f-1e54-4ed5-afd4-6060e6b54bda","home_team_name":"Lobos BUAP","home_team_acronym":null,"home_team_logo":"bs/mt/sports/production/soccer/teams/0c09332f-1e54-4ed5-afd4-6060e6b54bda.png","away_team_id":"acbe1950-4b3d-45c1-83ef-f2a3a37c5079","away_team_name":"Santos","away_team_acronym":null,"away_team_logo":"bs/mt/sports/production/soccer/teams/acbe1950-4b3d-45c1-83ef-f2a3a37c5079.png","current_period":null,"current_period_start_time":null,"current_period_stop_time":null,"home_team_score":0,"home_team_shoot_out_score":null,"away_team_score":0,"away_team_shoot_out_score":null,"home_team_odds":"+185","home_team_odds_money":2.85,"home_team_bet_id":"Mzk0MzY4Mjg2OjM3LzIwOjow","away_team_odds":"+155","away_team_odds_money":2.55,"away_team_bet_id":"Mzk0MzY4Mjg0OjMxLzIwOjow","draw_odds":"+230","draw_odds_money":3.3,"draw_bet_id":"Mzk0MzY4Mjg1OjIzLzEwOjow"},{"server_time":"2019-01-06T18:57:24Z","diff_seconds":null,"match_id":"68913bb0-1fe3-494b-8a7a-281c8dc65808","sport_slug":"soccer","competition_id":"9d6460c9-47d8-4017-9f5d-70d79017e244","competition":"LIGAMX","competition_logo":"bs/mt/sports/production/soccer/competitions/9d6460c9-47d8-4017-9f5d-70d79017e244.png","season":"Clausura 2019","season_round":"Regular","round":"Jornada 1","venue":null,"match_date":"2019-03-05T23:00:00Z","match_status":"Programado","home_team_id":"8bc5add7-e409-457e-9418-94092a33b5ee","home_team_name":"América","home_team_acronym":null,"home_team_logo":"bs/mt/sports/production/soccer/teams/8bc5add7-e409-457e-9418-94092a33b5ee.png","away_team_id":"036a765e-edbd-4b62-bf5d-6dd71f515f85","away_team_name":"Necaxa","away_team_acronym":null,"away_team_logo":"bs/mt/sports/production/soccer/teams/036a765e-edbd-4b62-bf5d-6dd71f515f85.png","current_period":null,"current_period_start_time":null,"current_period_stop_time":null,"home_team_score":0,"home_team_shoot_out_score":null,"away_team_score":0,"away_team_shoot_out_score":null,"home_team_odds":null,"home_team_odds_money":null,"home_team_bet_id":null,"away_team_odds":null,"away_team_odds_money":null,"away_team_bet_id":null,"draw_odds":null,"draw_odds_money":null,"draw_bet_id":null},{"server_time":"2019-01-06T18:57:24Z","diff_seconds":53740.005202,"match_id":"9f75ae97-6cfe-4437-888e-98cd8d20cadc","sport_slug":"soccer","competition_id":"9d6460c9-47d8-4017-9f5d-70d79017e244","competition":"LIGAMX","competition_logo":"bs/mt/sports/production/soccer/competitions/9d6460c9-47d8-4017-9f5d-70d79017e244.png","season":"Clausura 2019","season_round":"Regular","round":"Jornada 1","venue":"Akron","match_date":"2019-01-06T03:00:00Z","match_status":"Terminado","home_team_id":"e4139c5a-14f8-4479-bab8-b18502dc0e56","home_team_name":"Chivas","home_team_acronym":null,"home_team_logo":"bs/mt/sports/production/soccer/teams/e4139c5a-14f8-4479-bab8-b18502dc0e56.png","away_team_id":"98e2c017-67b3-4dad-b5ad-ba9446e62d4e","away_team_name":"Club Tijuana","away_team_acronym":null,"away_team_logo":"bs/mt/sports/production/soccer/teams/98e2c017-67b3-4dad-b5ad-ba9446e62d4e.png","current_period":"Segundo Tiempo","current_period_start_time":"2019-01-06T04:01:44Z","current_period_stop_time":"2019-01-06T04:55:32Z","home_team_score":2,"home_team_shoot_out_score":null,"away_team_score":0,"away_team_shoot_out_score":null,"home_team_odds":"-700","home_team_odds_money":1.142,"home_team_bet_id":"Mzk0MzY2NDg2OjEvNzo6MA","away_team_odds":"+5500","away_team_odds_money":56.0,"away_team_bet_id":"Mzk0MzY2NDg0OjU1LzE6OjA","draw_odds":"+500","draw_odds_money":6.0,"draw_bet_id":"Mzk0MzY2NDg1OjUvMTo6MA"},{"server_time":"2019-01-06T18:57:24Z","diff_seconds":60437.005202,"match_id":"9b8eac17-95e2-4a04-aa27-48b4ab4fb4c3","sport_slug":"soccer","competition_id":"9d6460c9-47d8-4017-9f5d-70d79017e244","competition":"LIGAMX","competition_logo":"bs/mt/sports/production/soccer/competitions/9d6460c9-47d8-4017-9f5d-70d79017e244.png","season":"Clausura 2019","season_round":"Regular","round":"Jornada 1","venue":"Estadio León","match_date":"2019-01-06T01:00:00Z","match_status":"Terminado","home_team_id":"214400b9-23c3-404e-9b1c-d15a2669e824","home_team_name":"León","home_team_acronym":null,"home_team_logo":"bs/mt/sports/production/soccer/teams/214400b9-23c3-404e-9b1c-d15a2669e824.png","away_team_id":"29ed3279-3488-44e7-b15b-ac1dcf363d3c","away_team_name":"Tigres","away_team_acronym":null,"away_team_logo":"bs/mt/sports/production/soccer/teams/29ed3279-3488-44e7-b15b-ac1dcf363d3c.png","current_period":"Segundo Tiempo","current_period_start_time":"2019-01-06T02:10:07Z","current_period_stop_time":"2019-01-06T02:59:58Z","home_team_score":2,"home_team_shoot_out_score":null,"away_team_score":2,"away_team_shoot_out_score":null,"home_team_odds":"+400","home_team_odds_money":5.0,"home_team_bet_id":"Mzk0MzY1NzQ3OjQvMTo6MA","away_team_odds":"+400","away_team_odds_money":5.0,"away_team_bet_id":"Mzk0MzY1NzQ1OjQvMTo6MA","draw_odds":"-200","draw_odds_money":1.5,"draw_bet_id":"Mzk0MzY1NzQ2OjEvMjo6MA"},{"server_time":"2019-01-06T18:57:24Z","diff_seconds":68007.005202,"match_id":"a260a65f-4b16-4c72-bcdf-cf5f62b66a60","sport_slug":"soccer","competition_id":"9d6460c9-47d8-4017-9f5d-70d79017e244","competition":"LIGAMX","competition_logo":"bs/mt/sports/production/soccer/competitions/9d6460c9-47d8-4017-9f5d-70d79017e244.png","season":"Clausura 2019","season_round":"Regular","round":"Jornada 1","venue":"La Corregidora","match_date":"2019-01-05T23:00:00Z","match_status":"Terminado","home_team_id":"75f90387-9a2a-435b-9d41-490bbf065c2a","home_team_name":"Club Querétaro","home_team_acronym":null,"home_team_logo":"bs/mt/sports/production/soccer/teams/75f90387-9a2a-435b-9d41-490bbf065c2a.png","away_team_id":"6ceed000-fe5f-4cef-b11f-9f3a0cdd3f3b","away_team_name":"Atlas","away_team_acronym":null,"away_team_logo":"bs/mt/sports/production/soccer/teams/6ceed000-fe5f-4cef-b11f-9f3a0cdd3f3b.png","current_period":"Segundo Tiempo","current_period_start_time":"2019-01-06T00:03:57Z","current_period_stop_time":"2019-01-06T00:54:49Z","home_team_score":1,"home_team_shoot_out_score":null,"away_team_score":2,"away_team_shoot_out_score":null,"home_team_odds":"+2200","home_team_odds_money":23.0,"home_team_bet_id":"Mzk0MzY0MDcxOjIyLzE6OjA","away_team_odds":"-450","away_team_odds_money":1.222,"away_team_bet_id":"Mzk0MzY0MDY5OjIvOTo6MA","draw_odds":"+400","draw_odds_money":5.0,"draw_bet_id":"Mzk0MzY0MDcwOjQvMTo6MA"},{"server_time":"2019-01-06T18:57:24Z","diff_seconds":67704.005202,"match_id":"9aad6b5f-174b-44c0-9ac6-9437eefed532","sport_slug":"soccer","competition_id":"9d6460c9-47d8-4017-9f5d-70d79017e244","competition":"LIGAMX","competition_logo":"bs/mt/sports/production/soccer/competitions/9d6460c9-47d8-4017-9f5d-70d79017e244.png","season":"Clausura 2019","season_round":"Regular","round":"Jornada 1","venue":"BBVA Bancomer","match_date":"2019-01-05T23:00:00Z","match_status":"Terminado","home_team_id":"6d726835-171b-46c2-a3e7-77668b8fbbe7","home_team_name":"Monterrey","home_team_acronym":null,"home_team_logo":"bs/mt/sports/production/soccer/teams/6d726835-171b-46c2-a3e7-77668b8fbbe7.png","away_team_id":"04b33410-ba65-417c-960f-658aa7ec5662","away_team_name":"Pachuca","away_team_acronym":null,"away_team_logo":"bs/mt/sports/production/soccer/teams/04b33410-ba65-417c-960f-658aa7ec5662.png","current_period":"Segundo Tiempo","current_period_start_time":"2019-01-06T00:09:00Z","current_period_stop_time":"2019-01-06T00:54:50Z","home_team_score":5,"home_team_shoot_out_score":null,"away_team_score":0,"away_team_shoot_out_score":null,"home_team_odds":"-2500","home_team_odds_money":1.04,"home_team_bet_id":"Mzk0MzY1MDA1OjEvMjU6OjA","away_team_odds":"+3300","away_team_odds_money":34.0,"away_team_bet_id":"Mzk0MzY1MDAzOjMzLzE6OjA","draw_odds":"+1400","draw_odds_money":15.0,"draw_bet_id":"Mzk0MzY1MDA0OjE0LzE6OjA"},{"server_time":"2019-01-06T18:57:24Z","diff_seconds":139845.005202,"match_id":"091710df-38a1-469b-b085-0985e6a09f71","sport_slug":"soccer","competition_id":"9d6460c9-47d8-4017-9f5d-70d79017e244","competition":"LIGAMX","competition_logo":"bs/mt/sports/production/soccer/competitions/9d6460c9-47d8-4017-9f5d-70d79017e244.png","season":"Clausura 2019","season_round":"Regular","round":"Jornada 1","venue":null,"match_date":"2019-01-05T03:00:00Z","match_status":"Terminado","home_team_id":"2d1b8f3e-f6be-4246-8108-35ae62c63f8b","home_team_name":"Puebla","home_team_acronym":null,"home_team_logo":"bs/mt/sports/production/soccer/teams/2d1b8f3e-f6be-4246-8108-35ae62c63f8b.png","away_team_id":"c32e4028-bebd-4987-a740-88e6ac3f0f32","away_team_name":"Cruz Azul","away_team_acronym":null,"away_team_logo":"bs/mt/sports/production/soccer/teams/c32e4028-bebd-4987-a740-88e6ac3f0f32.png","current_period":"Segundo Tiempo","current_period_start_time":"2019-01-05T04:06:39Z","current_period_stop_time":"2019-01-05T04:56:15Z","home_team_score":1,"home_team_shoot_out_score":null,"away_team_score":1,"away_team_shoot_out_score":null,"home_team_odds":"+500","home_team_odds_money":6.0,"home_team_bet_id":"Mzk0MzYyNzIxOjUvMTo6MA","away_team_odds":"+290","away_team_odds_money":3.9,"away_team_bet_id":"Mzk0MzYyNzE5OjI5LzEwOjow","draw_odds":"-175","draw_odds_money":1.571,"draw_bet_id":"Mzk0MzYyNzIwOjQvNzo6MA"},{"server_time":"2019-01-06T18:57:24Z","diff_seconds":147043.005202,"match_id":"0a26b59a-fdcb-4cd6-93f6-7e89f1d1a180","sport_slug":"soccer","competition_id":"9d6460c9-47d8-4017-9f5d-70d79017e244","competition":"LIGAMX","competition_logo":"bs/mt/sports/production/soccer/competitions/9d6460c9-47d8-4017-9f5d-70d79017e244.png","season":"Clausura 2019","season_round":"Regular","round":"Jornada 1","venue":null,"match_date":"2019-01-05T01:00:00Z","match_status":"Terminado","home_team_id":"4c6ff459-1237-4ea7-8e9e-629a2d46f53c","home_team_name":"Morelia","home_team_acronym":null,"home_team_logo":"bs/mt/sports/production/soccer/teams/4c6ff459-1237-4ea7-8e9e-629a2d46f53c.png","away_team_id":"21325b34-939b-4a45-87c5-45639f8add8a","away_team_name":"Toluca","away_team_acronym":null,"away_team_logo":"bs/mt/sports/production/soccer/teams/21325b34-939b-4a45-87c5-45639f8add8a.png","current_period":"Segundo Tiempo","current_period_start_time":"2019-01-05T02:06:41Z","current_period_stop_time":"2019-01-05T02:56:08Z","home_team_score":1,"home_team_shoot_out_score":null,"away_team_score":3,"away_team_shoot_out_score":null,"home_team_odds":"+12500","home_team_odds_money":126.0,"home_team_bet_id":"Mzk0MzYxMjM5OjEyNS8xOjow","away_team_odds":"-10000","away_team_odds_money":1.01,"away_team_bet_id":"Mzk0MzYxMjM3OjEvMTAwOjow","draw_odds":"+1600","draw_odds_money":17.0,"draw_bet_id":"Mzk0MzYxMjM4OjE2LzE6OjA"},{"server_time":"2019-01-06T18:57:24Z","diff_seconds":249991.005202,"match_id":"f8384e31-0612-4e85-a1cc-ab5848574e3c","sport_slug":"soccer","competition_id":"3ab784a6-f017-4769-a5f3-a11dffd83870","competition":"La Liga Española","competition_logo":"bs/mt/sports/production/soccer/competitions/3ab784a6-f017-4769-a5f3-a11dffd83870.png","season":"2018-2019","season_round":"Regular","round":"Jornada 17","venue":null,"match_date":"2019-01-03T20:30:00Z","match_status":"Terminado","home_team_id":"96059ff0-6a32-4421-9b02-c2e6c0cabeee","home_team_name":"Villarreal","home_team_acronym":null,"home_team_logo":"bs/mt/sports/production/soccer/teams/96059ff0-6a32-4421-9b02-c2e6c0cabeee.png","away_team_id":"a179e03b-df77-498d-ad44-0d12353bc8fb","away_team_name":"Real Madrid","away_team_acronym":null,"away_team_logo":"bs/mt/sports/production/soccer/teams/a179e03b-df77-498d-ad44-0d12353bc8fb.png","current_period":"Segundo Tiempo","current_period_start_time":"2019-01-03T21:30:53Z","current_period_stop_time":"2019-01-03T22:19:11Z","home_team_score":2,"home_team_shoot_out_score":null,"away_team_score":2,"away_team_shoot_out_score":null,"home_team_odds":"+2800","home_team_odds_money":29.0,"home_team_bet_id":"Mzg4NDI5OTg1OjI4LzE6OjA","away_team_odds":"+2200","away_team_odds_money":23.0,"away_team_bet_id":"Mzg4NDI5OTgzOjIyLzE6OjA","draw_odds":"-5000","draw_odds_money":1.02,"draw_bet_id":"Mzg4NDI5OTg0OjEvNTA6OjA"},{"server_time":"2019-01-06T18:57:24Z","diff_seconds":250569.005202,"match_id":"cdc4d46d-c538-401e-9961-8f56c5da3a47","sport_slug":"soccer","competition_id":"eaa72fa5-f5e5-4ab2-ac36-b77b6536a43a","competition":"Liga NOS","competition_logo":"bs/mt/sports/production/soccer/competitions/eaa72fa5-f5e5-4ab2-ac36-b77b6536a43a.png","season":"2018-2019","season_round":"Regular","round":"Jornada 15","venue":null,"match_date":"2019-01-03T20:15:00Z","match_status":"Terminado","home_team_id":"13206cda-5b72-48b6-bc43-8d8ed2d1fb51","home_team_name":"Deportivo Aves","home_team_acronym":null,"home_team_logo":"bs/mt/sports/production/soccer/teams/13206cda-5b72-48b6-bc43-8d8ed2d1fb51.png","away_team_id":"d5eb2651-9aef-48dd-a3bc-f703946c604b","away_team_name":"Porto","away_team_acronym":null,"away_team_logo":"bs/mt/sports/production/soccer/teams/d5eb2651-9aef-48dd-a3bc-f703946c604b.png","current_period":"Segundo Tiempo","current_period_start_time":"2019-01-03T21:21:15Z","current_period_stop_time":"2019-01-03T22:12:26Z","home_team_score":0,"home_team_shoot_out_score":null,"away_team_score":1,"away_team_shoot_out_score":null,"home_team_odds":"+4500","home_team_odds_money":46.0,"home_team_bet_id":"MzkzNzMyODkxOjQ1LzE6OjA","away_team_odds":"-1600","away_team_odds_money":1.062,"away_team_bet_id":"MzkzNzMyODg0OjEvMTY6OjA","draw_odds":"+900","draw_odds_money":10.0,"draw_bet_id":"MzkzNzMyODg3OjkvMTo6MA"},{"server_time":"2019-01-06T18:57:24Z","diff_seconds":338960.00520200003,"match_id":"d24a90ac-2f47-494e-be35-1775e17cd5ba","sport_slug":"soccer","competition_id":"7ba09a6c-afbb-47f0-84e2-895860cfa8aa","competition":"Premier League","competition_logo":"bs/mt/sports/production/soccer/competitions/7ba09a6c-afbb-47f0-84e2-895860cfa8aa.png","season":"2018-2019","season_round":"Regular","round":"Jornada 21","venue":null,"match_date":"2019-01-02T19:45:00Z","match_status":"Terminado","home_team_id":"f52b2b9d-3515-4b94-a496-969d25061181","home_team_name":"West Ham","home_team_acronym":null,"home_team_logo":"bs/mt/sports/production/soccer/teams/f52b2b9d-3515-4b94-a496-969d25061181.png","away_team_id":"e62f1d41-0dde-486f-bf67-8fd267e734cb","away_team_name":"Brighton Hove Albion","away_team_acronym":null,"away_team_logo":"bs/mt/sports/production/soccer/teams/e62f1d41-0dde-486f-bf67-8fd267e734cb.png","current_period":"Segundo Tiempo","current_period_start_time":"2019-01-02T20:48:04Z","current_period_stop_time":"2019-01-02T21:37:18Z","home_team_score":2,"home_team_shoot_out_score":null,"away_team_score":2,"away_team_shoot_out_score":null,"home_team_odds":"+260","home_team_odds_money":3.6,"home_team_bet_id":"Mzg5NDM5Njg4OjEzLzU6OjA","away_team_odds":"+550","away_team_odds_money":6.5,"away_team_bet_id":"Mzg5NDM5Njg2OjExLzI6OjA","draw_odds":"-167","draw_odds_money":1.6,"draw_bet_id":"Mzg5NDM5Njg3OjMvNTo6MA"},{"server_time":"2019-01-06T18:57:24Z","diff_seconds":339019.00520200003,"match_id":"062c2292-234b-4887-8404-1688d2fee04f","sport_slug":"soccer","competition_id":"7ba09a6c-afbb-47f0-84e2-895860cfa8aa","competition":"Premier League","competition_logo":"bs/mt/sports/production/soccer/competitions/7ba09a6c-afbb-47f0-84e2-895860cfa8aa.png","season":"2018-2019","season_round":"Regular","round":"Jornada 21","venue":null,"match_date":"2019-01-02T19:45:00Z","match_status":"Terminado","home_team_id":"36f8e21e-e614-46f3-8d40-58e7d273c36d","home_team_name":"Wolverhampton","home_team_acronym":null,"home_team_logo":"bs/mt/sports/production/soccer/teams/36f8e21e-e614-46f3-8d40-58e7d273c36d.png","away_team_id":"350d61c5-1a4d-4fe3-9b8c-fe6c48a4b0bb","away_team_name":"Crystal Palace","away_team_acronym":null,"away_team_logo":"bs/mt/sports/production/soccer/teams/350d61c5-1a4d-4fe3-9b8c-fe6c48a4b0bb.png","current_period":"Segundo Tiempo","current_period_start_time":"2019-01-02T20:47:05Z","current_period_stop_time":"2019-01-02T21:37:07Z","home_team_score":0,"home_team_shoot_out_score":null,"away_team_score":2,"away_team_shoot_out_score":null,"home_team_odds":"+400","home_team_odds_money":5.0,"home_team_bet_id":"Mzg5NDQwMzIyOjQvMTo6MA","away_team_odds":"+525","away_team_odds_money":6.25,"away_team_bet_id":"Mzg5NDQwMzIwOjIxLzQ6OjA","draw_odds":"-239","draw_odds_money":1.42,"draw_bet_id":"Mzg5NDQwMzIxOjIxLzUwOjow"}]}';
    $response = new JsonResponse(json_decode($service,true));
    $response->setSharedMaxAge(300);
    return $response;
  }

  /**
  * @Route("/get-rounds")
  */
  public function getRounds(Request $request){
    $leagueId = $_GET["league"];
    $seasonId = $_GET["season"];
    $templates = $_GET["templates"];
    $service = array();
    $hostMictlan = $this->getParameter('servicesMictlan');
    $resultRounds = @file_get_contents($hostMictlan."competitions/competitions/".$leagueId."/calendar?season=".$seasonId);
    $resultRounds = json_decode($resultRounds,true);
    if(isset($resultRounds["dimensions"]["bundle"])){
      $seasonRoundId = ""; // Empty when parameter seasonRound doesn´t exists.
      foreach ($resultRounds["dimensions"]["bundle"] as $keyB => $serviceBundle) {
        if($serviceBundle['name'] == 'seasonRound'){
          $service["seasonRound"] = $serviceBundle["values"];
          $seasonRoundId = $serviceBundle["values"][0]["id"]; // Always show first seasonRound.
          break;
        }
      }
    }
    $resultRounds = @file_get_contents($hostMictlan."competitions/competitions/".$leagueId."/calendar?season=".$seasonId."&seasonRound=".$seasonRoundId);
    $resultRounds = json_decode($resultRounds,true);
    if(isset($resultRounds["dimensions"]["bundle"])){
      foreach ($resultRounds["dimensions"]["bundle"] as $keyB => $serviceBundle) {
        if($serviceBundle['name'] == 'round'){
          $service["rounds"] = $serviceBundle["values"];
          foreach ($service["rounds"] as $key => $value) {
            if($resultRounds["dimensions"]["configuration"]["round"] == $value["id"]){
              $service["lastRound"] = $value["label"];
              break;
            }
          }
          break;
        }
      }
    }
    $service["templates"] = array();
    foreach ($templates as $keyTpl => $valueTpl) {
      $moduleModel = array(
        "template" => $valueTpl,
        "leagueId" => $leagueId,
        "season" => $seasonId,
        "title" => ""
      );
      array_push($service["templates"],$this->container->get('templating')->render('@CamusAssets/Groups/sn/stadistics.html.twig', array('module' => $moduleModel)));
    }

    return new JsonResponse($service);
  }

  /**
  * @Route("/get-seasons-round")
  */
  public function getSeasonsRound(Request $request){
    $leagueId = $_GET["league"];
    $seasonId = $_GET["season"];
    $seasonRoundId = $_GET["seasonRound"];
    $service = array();
    $moduleModelS = array(
      "template" => "league_standings",
      "leagueId" => $leagueId,
      "season" => $seasonId,
      "round" => "",
      "seasonRound" => $seasonRoundId,
      "title" => ""
    );
    $moduleModelC = array(
      "template" => "league_calendar",
      "leagueId" => $leagueId,
      "season" => $seasonId,
      "round" => "",
      "seasonRound" => $seasonRoundId,
      "title" => ""
    );

    $hostMictlan = $this->getParameter('servicesMictlan');
    $resultRounds = @file_get_contents($hostMictlan."competitions/competitions/".$leagueId."/calendar?season=".$seasonId."&seasonRound=".$seasonRoundId);
    $resultRounds = json_decode($resultRounds,true);
    if(isset($resultRounds["dimensions"]["bundle"])){
      foreach ($resultRounds["dimensions"]["bundle"] as $keyB => $serviceBundle) {
        if($serviceBundle['name'] == 'round'){
          foreach ($serviceBundle["values"] as $key => $value) {
            if($resultRounds["dimensions"]["configuration"]["round"] == $value["id"]){
                $service["lastRound"] = $value["label"];
                break;
            }
          }
        }
      }
      foreach ($resultRounds["dimensions"]["bundle"] as $keyB => $serviceBundle) {
        if($serviceBundle['name'] == 'seasonRound'){
          $service["seasonRound"] = $serviceBundle["values"];
          break;
        }
      }
    }

    $service["standing"] = $this->container->get('templating')->render('@CamusAssets/Groups/sn/stadistics.html.twig', array('module' => $moduleModelS));
    $service["calendar"] = $this->container->get('templating')->render('@CamusAssets/Groups/sn/stadistics.html.twig', array('module' => $moduleModelC));

    return new JsonResponse($service);
  }

  /**
  * @Route("/get-stats")
  */
  public function getStats(Request $request){
    $leagueId = $_GET["league"];
    $seasonId = $_GET["season"];
    $roundId = $_GET["round"];
    $service = array();
    $moduleModelS = array(
      "template" => "league_standings",
      "leagueId" => $leagueId,
      "season" => $seasonId,
      "round" => $roundId,
      "title" => ""
    );
    $moduleModelC = array(
      "template" => "league_calendar",
      "leagueId" => $leagueId,
      "season" => $seasonId,
      "round" => $roundId,
      "title" => ""
    );
    $service["standing"] = $this->container->get('templating')->render('@CamusAssets/Groups/sn/stadistics.html.twig', array('module' => $moduleModelS));
    $service["calendar"] = $this->container->get('templating')->render('@CamusAssets/Groups/sn/stadistics.html.twig', array('module' => $moduleModelC));

    return new JsonResponse($service);
  }

  /**
  * @Route("/next-content")
  */
  public function contentNextAction(Request $request){
    if(isset($_GET["mvList"]) && isset($_GET["index"])) {
      $mvList = $_GET["mvList"];
      $index = $_GET["index"];

      $url = preg_replace("/.*\.(com|net|mx)(?=\/)/","", $mvList[$index]);

      $service = $this->postFromApi($url, array());

      if(empty($url)){
        return new Response("");
      }
      if ($service->code == 404) {
        return new Response("");
      }
      $contentId = (isset($service->data->id)) ? $service->data->id : '';
      // $boardColor = (isset($service->data->headerBackground)) ? $service->data->headerBackground : '#b10b1f';
      $contentType = $service->data->type;
      $response = $this->getContentFromApi($service);
      $responseModules = $this->countAdsDetail($response->modules);
      $modules = $responseModules['modules'];
      // $ads = $responseModules['ads'];

      foreach ($modules->head as $key => $module) {
        if(isset($module->type) && isset($module->template)){
          $lastTemplate = explode("_",$module->template);
          if(array_key_exists($module->type."_".end($lastTemplate),$modules->head)){
            $modules->head[$module->type."_".end($lastTemplate)."_".$key] = $modules->head[$key];
          }else{
            $modules->head[$module->type."_".end($lastTemplate)] = $modules->head[$key];
          }
          unset($modules->head[$key]);
        }
      }
      #$masVistas = json_decode(file_get_contents($this->getParameter('servicesMoreView')));
      $masVistas = json_decode(file_get_contents($this->getParameter('servicesMoreView')));
      // $nuevasVistas = json_decode(file_get_contents("http://stage.services.mediotiempo.net/services/MDMTMoreViews/portadavistas.json"));
      // $opinionesMasVistas = array();
      // foreach ($nuevasVistas as $key => $value) {
      //   if(count($opinionesMasVistas) > 2){
      //     break;
      //   }
      //   if($value->tipoContenido == 10){
      //     $opinionesMasVistas[] = $value;
      //   }
      // }
      foreach ($modules->sidebar as $key => $module) {
        if($module->type == 'list_small' && $module->template == 'findings' ){
          foreach ($masVistas as $key => $value) {
            if($key < 10){
              $modClone = clone $module->modules[$key];
              $modClone->content = clone $module->modules[$key]->content;
              array_push($module->modules, $modClone);
              $module->modules[$key]->title = $masVistas[$key]->titulo;
              $media = array('src' => $masVistas[$key]->imagen);
              $module->modules[$key]->thumbnail = (object)$media;
              $module->modules[$key]->content->slug = $masVistas[$key]->url;
            } else {
              unset($module->modules[$key]);
            }
          }
        }elseif ($module->type == 'list_small' && $module->template == 'base' && $contentType == 'FIR') {
          foreach ($module->modules as $listKey => $listElement) {
            if($listKey < 3 && isset($opinionesMasVistas[$listKey])){
              $modules->sidebar[$key]->modules[$listKey]->title = $opinionesMasVistas[$listKey]->titulo;
              $media = array('src' => $opinionesMasVistas[$listKey]->imagen);
              $modules->sidebar[$key]->modules[$listKey]->thumbnail = (object)$media;
              $slug = $opinionesMasVistas[$listKey]->url;
              $autor = (isset($opinionesMasVistas[$listKey]->autor)) ? $opinionesMasVistas[$listKey]->autor : '';
              $modules->sidebar[$key]->modules[$listKey]->content->author->name = $autor;
              $modules->sidebar[$key]->modules[$listKey]->content->slug = $slug;
            }
          }
        }
      }

      $pageObj = $this->getPagination(1);
      $typesList = (object)['NWS' => 'news', 'ENT' => 'news', 'CHR' => 'news', 'FIR' => 'opinion', 'DEB' => 'opinion', 'PGL' => 'basic', 'MAM' => 'event', 'EDT' => 'event', 'VID' => 'basic', 'CRT' => 'basic', 'POS' => 'opinion'];
      $detailType = $typesList->$contentType;
      return $this->render('@CamusAssets/Fixtures/article.html.twig', array(
        'detailType' => $detailType,
        'modules' => $modules,
        'contentId' => $contentId,
        'url' => $url
      ));
    }
  }

  /**
  * @Route("/contact-form")
  */
  public function contactFormAction(){
    if(isset($_GET["name"]) && isset($_GET["email"])){
      $message=stripslashes($_GET["message"]);
      $secret="6Lfk2aAUAAAAAIUOGaJd9iJ9uQED8-db4Ubr5n2S";
      $response=$_GET["captcha"];
      $verify=file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret={$secret}&response={$response}");
        $captcha_success=json_decode($verify);
        if ($captcha_success->success==false) {
          return new JsonResponse("False");
        }
        else if ($captcha_success->success==true) {
          $name = $_GET["name"];
          $email = $_GET["email"];
          $departament = $_GET["departament"];
          $place = $_GET["place"];
          $message = $_GET["message"];

          $departamentos = array(
            "ventas"=>array('Ventas', 'andrea.moreno@milenio.com'),
            /*"rhdf"=>array('Admon./Recursos Humanos', 'luis.garcia@milenio.com'),
            "redaccion"=>array('Redacción', 'reporteros.df@milenio.com,monitoreo.df@milenio.com'),
            "mileniotv" => array("MilenioTV", 'hector.zamarron@milenio.com,roberto.velazquez@milenio.com'),
            "susc"=>array('Suscripciones', 'suscripciones@milenio.com'),
            "moviles"=>array('Aplicaciones Móviles', 'moviles@operaciones.milenio.com'),*/
          );

          $departamento =  $departamentos[$departament];

          $email_to = $departamento[1];
          $email_subject = "Forma de contacto milenio.com - plaza";

          $email_message = "Información del usuario\n";
          $email_message .= "Nombre: ".$name."\n";
          $email_message .= "Email: ".$email."\n";
          $email_message .= "Plaza: ".$place."\n";
          $email_message .= "El usuario envio el siguiente mensaje: \n".$message."\n";

          $headers = 'From: '.$email."\r\n".
          'Reply-To: '.$email."\r\n" .
          'X-Mailer: PHP/' . phpversion();
          @mail($email_to, $email_subject, $email_message, $headers);
          return new JsonResponse("True");
        }
    }
  }

  /**
  * @Route("/authors/list")
  */
  public function authorsListAction(Request $request){
    $letter = $_GET["letter"];
    $isCartoon = $_GET["isCartoon"];
    $authors = $this->postFromApi('/authors/'.$letter, array(
      'isCartoon' => $isCartoon
    ));
    return new JsonResponse($authors->data);
  }

  /**
  * @Route("/topics/list")
  */
  public function topicsListAction(Request $request){
    $letter = $request->request->get('letter');
    $authors = $this->postFromApi('/topic_filter/'.$letter,array());
    return new JsonResponse($authors->data);
  }

  /**
  * @Route("/authors/date")
  */
  public function authorsDateAction(Request $request){
    $date = $_GET["date"];
    $place = $_GET["place"];
    $modules = $this->postFromApi('/opinion?date='.$date, array(
      'date' => $date,
      'place' => $place
    ));

    return $this->render('@CamusAssets/Content/content-indivual.html.twig', array('modules' => $modules));
  }

  /**
  * @Route("/cartoons/date")
  */
  public function cartoonsDateAction(Request $request){
    $date = $request->request->get('date');
    $modules = $this->postFromApi('/opinion/moneros?date='.$date, array(
      'date' => $date
    ));

    return $this->render('@CamusAssets/Content/content-indivual.html.twig', array('modules' => $modules));
  }

  public function letterAction($letter = 'a'){
    $authors = $this->postFromApi('/authors/'.$letter, array());
    return new JsonResponse($authors->data);
  }

  /**
  * @Route("/buscador/{page}/{number}", name="search", defaults={"page"=null, "number"=null})
  */
  public function searchAction(Request $request, $page, $number){
    $filters = $request->query->all();
    $slug = '/find/';
    if(isset($filters["text"])){
      $slug = $slug.'?text='.$filters["text"];
      if($number != null){
        $slug = $slug.'&page='.$number;
        $page = $number;
      }
    }

    if(strpos($slug, 'page')){
      if(!isset($_SERVER['HTTP_REFERER'])){
        if($number != 1){
          return $this->redirectToRoute('search',
            array(
              'page' => 'page',
              'number' => 1,
              'text' => $filters['text']
              ),
            301);
        }
      }
    } else {
      $page = 1;
    }

    $service = $this->postFromApi($slug, $filters);

    if($service == false){
      throw $this->createNotFoundException();
    }
    $ads = null;
    $modules = null;
    if(is_object($service->data)){
      $modules = $this->getBoardFromApi($service);
      $response = $this->countAds($modules);
      $modules = $response['modules'];
      $modules[1]->dataSearch = $filters;
      $ads = $response['ads'];
    }
    if($modules == null){
      throw $this->createNotFoundException();
    }

    $pageObj = $this->getPagination($page);
    $tagContainer = array(
      'section' => 'busqueda',
      'subsection' => $filters['text'],
      'subsubsection' => ''
    );
    $keywords = array('Buscador');

    $arrayCss = array();
    $resultFileCss = array();
    $this->getListModules($modules,$arrayCss);
    if(count($arrayCss)){
      $resultFileCss = array_values(array_unique($arrayCss));
    }

    return $this->render('@CamusAssets/Content/content.html.twig', array(
      'meta' => '',
      'keywords' => $keywords,
      'modules' => $modules,
      'boardColor' => 'rgba(177,11,31,1)',
      'headerType' => 1,
      'currentSection' => '',
      'page' => $pageObj,
      'ads' => $ads,
      'gtm' => $tagContainer,
      'contentLayer' => $service->data,
      'fileCSS' => $resultFileCss
    ))->setSharedMaxAge(1);
  }

  /**
  * @Route("/temas/{topic}/{page}/{number}", name="topic", defaults={"page"=null, "number"=null})
  */
  public function topicAction($topic, $page, $number){
    $slug = '/topics/'.$topic;
    $slug = ($page != null ? $slug.'/'.$page : $slug);
    $slug = ($number != null ? $slug.'/'.$number : $slug);
    $body = array();
    if(strpos($slug, 'page')){
      $slug = explode('/page/', $slug);
      $page = $slug[1];
      $slug = $slug[0];
      if(!isset($_SERVER['HTTP_REFERER'])){
        if($number != 1){
          return $this->redirectToRoute('topic',
            array(
              'topic' => $topic,
              'page' => 'page',
              'number' => 1
              ),
            301);
        }
      }
      $body['page'] = $page;
      $obdy['topic'] = $topic;
      $service = $this->postFromApi($slug, $body);
    }else{
      $page = 1;
      $body['page'] = $page;
      $obdy['topic'] = $topic;
      $service = $this->postFromApi($slug, $body);
    }

    if($service == false){
      throw $this->createNotFoundException();
    }

    $modules = $this->getBoardFromApi($service);

    if($modules == null){
      throw $this->createNotFoundException();
    }

    $response = $this->countAds($modules);
    $modules = $response['modules'];
    $ads = $response['ads'];
    $pageObj = $this->getPagination($page);

    $tagContainer = array(
      'section' => 'temas',
      'subsection' => $topic,
      'subsubsection' => ''
    );

    $arrayCss = array();
    $resultFileCss = array();
    $this->getListModules($modules,$arrayCss);
    if(count($arrayCss)){
      $resultFileCss = array_values(array_unique($arrayCss));
    }

    return $this->render('@CamusAssets/Content/content.html.twig', array(
      'meta' => '',
      'modules' => $modules,
      'headerType' => 1,
      'currentSection' => $topic,
      'page' => $pageObj,
      'ads' => $ads,
      'gtm' => $tagContainer,
      'boardColor' => 'rgba(177,11,31,1)',
      'contentLayer' => $service->data,
      'fileCSS' => $resultFileCss
    ));
  }

  /**
  * @Route("/module/date")
  */
  public function moduleDateAction(Request $request){
    $date = $request->request->get('date');
    $id = $request->request->get('id');
    $response = $this->modulerenderAction($id);

    return $response;
  }

  /**
  * @Route("/element-loader", name="elementLoader")
  */
  public function elementLoaderAction(){
    $route = "/mileniotv/programas/list_range";
    if(isset($_POST["offset"]) && isset($_POST["limit"])) {
      $body['offset'] = $_POST["offset"];
      $body['limit'] = $_POST["limit"];
      $service = $this->postFromApi($route, $body);
      if(isset($service)) {
        $response = $this->render('@CamusAssets/Fixtures/element-loader.html.twig', array(
          'modules' => $service->data,
          'boardColor' => "#b10b1f"
        ));
        return new Response($response);
      } else {
        return new Response("");
      }
    }
  }

  /**
  * @Route("/subscribe/newsletter", name="subscribeNewsletter")
  */
  public function subscribeAction(Request $request){
    $ids = array(
      'morning' => '66a5d1fc82',
      'late' => 'b490325fd7',
      'opinion' => '623783db07',
      'labyrinth' => 'ba95320083',
      'sports' => 'cbff0290bc',
      'promos' => ''
    );
    // $ids = array(
    //   'morning' => 'b15ab2a413',
    //   'late' => '6203da3599',
    //   'opinion' => '6b529033f1',
    //   'labyrinth' => 'c73ac9faa2',
    //   'sports' => '3506388b18',
    //   'promos' => 'ad422833d0'
    // );
    $mailchimpKey = $this->getParameter('mailchimp_key');
    $mailchimp = new MailChimp($mailchimpKey);

    $checks = $request->request->get('checks');
    $mail = $request->request->get('mail');
    foreach ($checks as $key => $value) {
      if($value == true){
        $mailchimp->post('lists/'.$ids[$key].'/members', [
          'email_address' => $mail,
          'status' => 'subscribed'
        ]);
      }
    }
    $response = array(
      'status' => 200,
      'message' => 'All OK'
    );
    return new JsonResponse($response);
  }

  /**
  * @Route("/{feed}/{file}", requirements={"feed":"(rss|json)","file":"([a-z]+.json|nbcvideo|msnnacional)"} , name="rss")
  */
  public function rssAction($feed,$file){
    $httpClient = $this->container->get('httpClient');
    // $service = $httpClient->get($feed."/".$file."?X-API-KEY=DedqTquBxMkX.-+7LtRtPVOUznm3FV2SWd0ooyDgucBFhDHhLc6")->getBody()->getContents();
    $service = $httpClient->get($feed."/".$file."?X-API-KEY=8qdHugTGrEWiRvcgNYj=LUGrYAdbCamGf=XbhN38GKpKC9")->getBody()->getContents();
    $response = new Response($service);
    if($file == "nbcvideo" && $feed == "rss"){
      $response->headers->set('Content-Type', 'application/xml');
    }else{
      $response->headers->set('Content-Type', 'application/json');
    }
    return $response;
  }

  /**
  * @Route("/sitemap/{file}",
  * name="sitemap")
  */
  public function sitemapAction($file, Request $request){
    $slug = $request->getPathInfo();
    $env = rtrim($this->getParameter("aws_s3"), "/");
    $xml = file_get_contents($env.$slug);

    if($xml !== false){
      $response = new Response($xml);
      $response->headers->set('Content-Type', 'text/xml');
      return $response;
    } else {
      throw $this->createNotFoundException();
    }
  }

  /**
  * @Route("/ads.txt",
  * name="ads")
  */
  public function adsAction(Request $request){
    $slug = $request->getPathInfo();
    $env = rtrim($this->getParameter("aws_s3"), "/");
    $txt = file_get_contents($env.'/ads'.$slug);

    if($txt !== false){
      $response = new Response($txt);
      $response->headers->set('Content-Type', 'text/plain');
      return $response;
    } else {
      throw $this->createNotFoundException();
    }
  }

  /**
  * @Route("/reset-password", name="resetPassword")
  */
  public function resetPasswordAction(Request $request){
    $token = $request->get('reset_token');

    if(isset($token)) {
      return $this->render('@CamusAssets/Fixtures/reset-password.html.twig',
      array(
        'headerType' => 9,
        'currentSection' => 'reset-password'
      ));
    } else {
      throw $this->createNotFoundException();
    }
  }

  /**
  * @Route("/{urlImage}",
  * name="convert_image",
  * requirements={"urlImage":"(bbtfile.*|bbtstats.*|static.*images|sites.*images|mediacenter.*|wp-content/uploads.*|.*MIL[a-zA-Z]{3}\d{7,}_\d{4}.*)"})
  */
  public function convertImageAction($urlImage){
    preg_match('/^.*(MIL[a-zA-Z]{3})(\d{8}_\d{4})/',$urlImage, $matches);
    $contentId = "";
    $urlFile = "";
    if(isset($matches[2])) {
      $contentId = $matches[1].$matches[2];
    }
    if($contentId != "") $modules = $this->getOldContentFromApi('/'.$contentId);
    if($modules != null){
      $urlFile = $modules;
    }
    $this->transformImage($urlFile);
  }

  /**
  * @Route("/{section}/{subsection}/{title}/{content}/{page}",
  * name="note_detail",
  * requirements={"section":"^(?!uploads|http|mileniotv)[^/]+","page":".*"},
  * defaults={"subsection" = null, "title"= null, "content"= null, "page"=null})
  */
  public function noteDetailAction($section, $subsection,$title, $content, $page, Request $request){
    $slug = $request->getPathInfo();
    $numPag = 1; // Pagination variable;
    $urlStadistics = array();
    $tabStadistics = "";
    $slugNew = "";
    $body = array();

    $termsSections = array("/aviso-legal-y-de-privacidad", "/contactanos", "/suscripciones/perfil"); // Terms sections
    if(in_array($slug, $termsSections)){
      return $this->render('@CamusAssets/Templates/terms-conditions/base.html.twig',
      array(
        'boardColor' => '#b10b1f',
        'headerType' => 9,
        'currentSection' => $slug
      ));
    }

    if(strpos($slug, '.html')){
      $slug = $this->obtenerIdv2($slug);
      if(empty($slug)) throw $this->createNotFoundException();
      $modules = $this->getOldContentFromApi('/'.$slug->id);
      if($modules == null){
        throw $this->createNotFoundException();
      }

      $slugParts = array('', '', '','');
      $oldSlug = array_values(array_filter(explode('/', $modules)));
      for ($i=0; $i < count($slugParts); $i++) {
        $slugParts[$i] = ($i >= count($oldSlug)) ? '' : $oldSlug[$i];
      }
      $contentPart = "";
      if(isset($slugParts[3])){
        $contentPart = $slugParts[3];
      }
      return $this->redirectToRoute('note_detail',
        array(
          'section' => $slugParts[0],
          'subsection' => $slugParts[1],
          'title' => $slugParts[2],
          'content' => $contentPart
          ),
        301);
    }
    else{
      if(strpos($slug, 'opinion/moneros')){
        $matches = array();
        preg_match('/opinion\/moneros\/[a-z,-]+\/([0-9-]+)/', $slug, $matches);
        if(count($matches) > 1){
          $body['date'] = $matches[1];
          $slug = explode('/', $slug);
          unset($slug[count($slug)-1]);
          $slug = implode('/', $slug);
        }
      }

      if(strrpos($slug, 'page')){
        if(preg_match("/page\/\d+$/", $slug)){
          $arg = explode('/page/', $slug);
          $numPag = $arg[1];
          $slug = $arg[0];
          if(!isset($_SERVER['HTTP_REFERER'])){
            $rootParam = array("section" => $section, "subsection" => $subsection, "title" => $title, "content" => $content, "page" => $page);
            $rootParam = array_filter($rootParam, "strlen");
            end($rootParam);
            $rootParam[key($rootParam)] = 1;
            if($numPag != 1){
              return $this->redirectToRoute('note_detail',
              $rootParam,
              301);
            }
          }

          $body['page'] = $numPag;
        }
        if(strpos($slug,"ultima-hora") !== false && strpos($slug,"ultima-hora") == 1){
          if(isset($_COOKIE["sectionLastHour"])){
            $sectionUrl = $_COOKIE["sectionLastHour"];
            if($sectionUrl == "-1"){
              $slug = "/find";
              $filters = array("isLastNews" => true,"text" => "*");
              $body = array_merge($body,$filters);
            }else if($subsection != ""){ // Tiene subseccion
              if(isset($_COOKIE["sectionLink"])){
                $sectionLink = $_COOKIE["sectionLink"];
                if(strpos($sectionLink, $subsection) !== false){
                  $slug = "/find";
                  $filters = array("section" => $sectionUrl,"isLastNews" => true,"text" => "*");
                  $body = array_merge($body,$filters);
                }else{
                  setcookie("sectionLastHour", "/", time() - 86400, "/", $_SERVER['HTTP_HOST']);
                  setcookie("sectionLink", "/", time() - 86400, "/", $_SERVER['HTTP_HOST']);
                  return $this->redirectToRoute('note_detail',array('section' => $section));
                }
              }
            }else{
              setcookie("sectionLastHour", "/", time() - 86400, "/", $_SERVER['HTTP_HOST']);
              setcookie("sectionLink", "/", time() - 86400, "/", $_SERVER['HTTP_HOST']);
            }
          }else{
            if($subsection != ""){
              return $this->redirectToRoute('note_detail',array('section' => $section));
            }
          }
        }
        $service = $this->postFromApi($slug, $body);
      }
      else{
        $date = $request->query->get('date');
        $date = filter_var($date, FILTER_SANITIZE_NUMBER_INT);
        $body['page'] = $numPag;
        if($date != null){
          $body['date'] = $date;
        }
        if(strpos($slug,"ultima-hora") !== false && strpos($slug,"ultima-hora") == 1){
          if(isset($_COOKIE["sectionLastHour"])){
            $sectionUrl = $_COOKIE["sectionLastHour"];
            if($sectionUrl == "-1"){
              $slug = "/find";
              $filters = array("isLastNews" => true,"text" => "*");
              $body = array_merge($body,$filters);
            }else if($subsection != ""){ // Tiene subseccion
              if(isset($_COOKIE["sectionLink"])){
                $sectionLink = $_COOKIE["sectionLink"];
                if(strpos($sectionLink, $subsection) !== false){
                  $slug = "/find";
                  $filters = array("section" => $sectionUrl,"isLastNews" => true,"text" => "*");
                  $body = array_merge($body,$filters);
                }else{
                  setcookie("sectionLastHour", "/", time() - 86400, "/", $_SERVER['HTTP_HOST']);
                  setcookie("sectionLink", "/", time() - 86400, "/", $_SERVER['HTTP_HOST']);
                  return $this->redirectToRoute('note_detail',array('section' => $section));
                }
              }
            }else{
              setcookie("sectionLastHour", "/", time() + 86400, "/", $_SERVER['HTTP_HOST']);
              setcookie("sectionLink", "/", time() + 86400, "/", $_SERVER['HTTP_HOST']);
            }
          }
          else{
            if($subsection != ""){
              return $this->redirectToRoute('note_detail',array('section' => $section));
            }
          }
        }
        $isMam = false;
        preg_match('/\/(previo|antecedentes|en-vivo|ficha|estadisticas|resumen)$/', $slug, $matchesStadistics, PREG_OFFSET_CAPTURE);
        if(isset($matchesStadistics[1])){
          $slugNew = explode("/",$slug);
          array_pop($slugNew);
          $slugNew = implode("/",$slugNew);
          $service = $this->postFromApi($slugNew, $body);
          if($service->code != 404){
            if($service->data->type == "MAM"){
              $tabStadistics = $matchesStadistics[1][0];
              if(isset($service->data->matchId)){
                $matchId = $service->data->matchId;
                $hostMictlanS = $this->container->getParameter('servicesMictlan');
                switch ($tabStadistics) {
                  case 'previo':
                    array_push($urlStadistics,$hostMictlanS."soccer/matches/".$matchId."/streak");
                    break;
                  case 'antecedentes':
                    array_push($urlStadistics,$hostMictlanS."soccer/matches/".$matchId."/historyDetail");
                    break;
                  case 'ficha':
                    array_push($urlStadistics,$hostMictlanS."soccer/matches/".$matchId."/lineup");
                    break;
                  case 'estadisticas':
                    array_push($urlStadistics,$hostMictlanS."soccer/matches/".$matchId."/stats");
                    break;
                  case 'resumen':
                    array_push($urlStadistics,$hostMictlanS."soccer/matches/".$matchId."/goals",$hostMictlanS.$matchId."/lineup");
                    break;
                  default:
                    break;
                }
                $isMam = true;
              }
            }
          }
        }else{
          $slugNew = $slug;
        }
        if(!$isMam){
          preg_match('/\/(amp)$/', $slug, $matchAMP, PREG_OFFSET_CAPTURE);
          if(isset($matchAMP[1])){
            $slugParts = array('', '', '','','');
            $oldSlug = array_values(array_filter(explode('/', $slug)));
            for ($i=0; $i < count($slugParts); $i++) {
              $slugParts[$i] = ($i >= count($oldSlug)) ? '' : $oldSlug[$i];
              if($slugParts[$i] == "amp"){
                $slugParts[$i] = "";
              }
            }
            $slugParts = array_filter($slugParts);
            $slugAmp = implode("/",$slugParts);
            return $this->redirect($this->getParameter('amp_domain')."/".$slugAmp,301);
          }

          $oldSlug = array_values(array_filter(explode('/', $slug)));
          $season = null;
          $rounds = null;
          $round = null;
          $type = null;
          $actualSeason = null;
          $actualRound = null;
          $seasonRound = null;
          $automatic = false;
          if(isset($oldSlug[2])){
            if(isset($oldSlug[3])){
              $season = $oldSlug[3];
            }
            if(isset($oldSlug[4])){
              $round = $oldSlug[4];
            }

            $urlThirdLevel = $oldSlug[0]."/".$oldSlug[1]."/".$oldSlug[2];

            $service = $this->postFromApi($urlThirdLevel, $body);
            $actualSeason = strtoupper(preg_replace('/-/', ' ',$season));
            $actualRound = strtoupper(preg_replace('/-/', ' ',$round));

            if($service->code != 404){
              $modulesArray = $service->data->modules;
              $templatesName = ['stadistics_header','automatic_standings','automatic_players_offensive','automatic_players_defensive','automatic_players_successful_passes','automatic_goal_keeper_saves','automatic_players_expulsions','automatic_players_amonstations','automatic_teams_offensive', 'automatic_teams_defensive','automatic_teams_expulsions','automatic_teams_amonstations','stadistics_team_header','club_calendary','club_roster','club_player_most_goaler','club_player_most_blocking','club_player_passes_most_successful','club_player_most_saves','club_player_most_expulsions','club_player_most_amonstations'];
              $modules = array();
              if(isset($modulesArray)){
                foreach ($modulesArray as $key => $moduleVal) {
                  if(isset($moduleVal->template)){
                    if ($moduleVal->template == "automatic_calendar") {
                      if(isset($oldSlug[4])){
                        $seasonRound = $oldSlug[4];
                        $round = null;
                      }
                      if(isset($oldSlug[5])){
                        $round = $oldSlug[5];
                      }
                    }
                    if (in_array($moduleVal->template, $templatesName)) {
                      $automatic = true;
                    }else if(isset($moduleVal->modules)){
                      foreach ($moduleVal->modules as $key => $subModuleVal) {
                        if ($subModuleVal->template == "automatic_calendar") {
                          if(isset($oldSlug[4])){
                            $seasonRound = $oldSlug[4];
                            $round = null;
                          }
                          if(isset($oldSlug[5])){
                            $round = $oldSlug[5];
                          }
                        }
                        if (in_array($subModuleVal->template, $templatesName)) {
                          $automatic = true;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          if (!$automatic){
            $service = $this->postFromApi($slug, $body);
          }
        }
      }
      if($service == false){
        throw $this->createNotFoundException();
      }
      if($service->code == 301){
        $slugParts = array('', '', '','');
        $oldSlug = array_values(array_filter(explode('/', $service->data)));
        for ($i=0; $i < count($slugParts); $i++) {
          $slugParts[$i] = ($i >= count($oldSlug)) ? '' : $oldSlug[$i];
        }
        $contentPart = "";
        if(isset($slugParts[3])){
          $contentPart = $slugParts[3];
        }
        return $this->redirectToRoute('note_detail',
          array(
            'section' => $slugParts[0],
            'subsection' => $slugParts[1],
            'title' => $slugParts[2],
            'content' => $contentPart
            ),
          301);
      }
      if($service->type == 'Board'){
        $metas = (isset($service->data->meta)) ? $service->data->meta : "";
        $keywords = (isset($service->data->keywords)) ? $service->data->keywords : "";
        $boardColor = (isset($service->data->headerBackground)) ? $service->data->headerBackground : '#b10b1f';
        $modules = $this->getBoardFromApi($service);
        if($modules == null && $section != 'impreso'){
          throw $this->createNotFoundException();
        }
        if($section == 'impreso'){
          $ads = array();
        }
        else{
          $response = $this->countAds($modules);
          $modules = $response['modules'];
          $ads = $response['ads'];
        }

        $pageObj = $this->getPagination($numPag);

        $tagContainer = array('section' => '', 'subsection' => '', 'subsubsection' => '');
        $ptTag = array_keys($tagContainer);
        $slugParts = explode('/', $slug);
        array_shift($slugParts);
        foreach ($slugParts as $key => $value) {
          if(array_key_exists($key, $ptTag)) $tagContainer[$ptTag[$key]] = $value;
        }
        $arrayCss = array();
        $resultFileCss = array();
        $this->getListModules($modules,$arrayCss);
        if(count($arrayCss)){
          $resultFileCss = array_values(array_unique($arrayCss));
        }
        $responseRender = $this->render('@CamusAssets/Content/content.html.twig', array(
          'meta' => $metas,
          'keywords' => $keywords,
          'modules' => $modules,
          'headerType' => 1,
          'currentSection' => end($slugParts),
          'page' => $pageObj,
          'ads' => $ads,
          'gtm' => $tagContainer,
          'boardColor' => $boardColor,
          'contentLayer' => $service->data,
          'season' => $season,
          'actualSeason' => $actualSeason,
          'actualRound' => $actualRound,
          'round' => $round,
          'seasonRound' => $seasonRound,
          'typeStat' => $type,
          'fileCSS' => $resultFileCss,
        ));
        $responseRender->setSharedMaxAge(120);
        return $responseRender;
      }
      elseif ($service->type == 'Content') {
        $boardColor = (isset($service->data->headerBackground)) ? $service->data->headerBackground : '#b10b1f';
        $contentId = (isset($service->data->id)) ? $service->data->id : '';
        $contentType = $service->data->type;

        $response = $this->getContentFromApi($service);
        $responseModules = $this->countAdsDetail($response->modules);
        $modules = $responseModules['modules'];
        $ads = $responseModules['ads'];

        $tagContainer = array('section' => '', 'subsection' => '', 'subsubsection' => '');
        $ptTag = array_keys($tagContainer);
        $slugParts = explode('/', $slug);
        array_shift($slugParts); array_pop($slugParts);
        foreach ($slugParts as $key => $value) {
          if(array_key_exists($key, $ptTag)) $tagContainer[$ptTag[$key]] = $value;
        }

        if($modules == null){
          throw $this->createNotFoundException();
        }
        // $masVistas = json_decode(file_get_contents($this->getParameter('servicesMoreView')));
        // $nuevasVistas = json_decode(file_get_contents($this->getParameter('servicesMoreView')));
        // $opinionesMasVistas = array();
        // foreach ($nuevasVistas as $key => $value) {
        //   if(count($opinionesMasVistas) > 2){
        //     break;
        //   }
        //   if($value->tipoContenido == 10){
        //     $opinionesMasVistas[] = $value;
        //   }
        // }
        foreach ($modules->head as $key => $module) {
          if(isset($module->type) && isset($module->template)){
            $lastTemplate = explode("_",$module->template);
            if(array_key_exists($module->type."_".end($lastTemplate),$modules->head)){
              $modules->head[$module->type."_".end($lastTemplate)."_".$key] = $modules->head[$key];
            }else{
              $modules->head[$module->type."_".end($lastTemplate)] = $modules->head[$key];
            }
            unset($modules->head[$key]);
          }
        }
        // foreach ($modules->sidebar as $key => $module) {
        //   if($module->type == 'list_small' && $module->template == 'findings' ){
        //     foreach ($masVistas as $key => $value) {
        //       if($key < 10){
        //         $modClone = clone $module->modules[$key];
        //         $modClone->content = clone $module->modules[$key]->content;
        //         array_push($module->modules, $modClone);
        //         $module->modules[$key]->title = $masVistas[$key]->titulo;
        //         $media = array('src' => $masVistas[$key]->imagen);
        //         $module->modules[$key]->thumbnail = (object)$media;
        //         $module->modules[$key]->content->slug = $masVistas[$key]->url;
        //       } else {
        //         unset($module->modules[$key]);
        //       }
        //     }
        //   }elseif ($module->type == 'list_small' && $module->template == 'base' && $contentType == 'FIR') {
        //     foreach ($module->modules as $listKey => $listElement) {
        //       if($listKey < 3 && isset($opinionesMasVistas[$listKey])){
        //         $modules->sidebar[$key]->modules[$listKey]->title = $opinionesMasVistas[$listKey]->titulo;
        //         $media = array('src' => $opinionesMasVistas[$listKey]->imagen);
        //         $modules->sidebar[$key]->modules[$listKey]->thumbnail = (object)$media;
        //         //$slug = str_replace('http://www.milenio.com', '', $opinionesMasVistas[$listKey]->url);
        //         $slug = $opinionesMasVistas[$listKey]->url;
        //         $autor = (isset($opinionesMasVistas[$listKey]->autor)) ? $opinionesMasVistas[$listKey]->autor : '';
        //         $modules->sidebar[$key]->modules[$listKey]->content->author->name = $autor;
        //         $modules->sidebar[$key]->modules[$listKey]->content->slug = $slug;
        //       }
        //       elseif ($listKey < 3 && !isset($opinionesMasVistas[$listKey])) {
        //         unset($modules->sidebar[$key]->modules[$listKey]);
        //       }
        //     }
        //   }
        // }
        // foreach ($modules->bottom as $key => $module) {
        //   if($module->type == 'list_small' && $module->template == 'findings' ){
        //     foreach ($module->modules as $listKey => $listElement) {
        //       if($listKey < 5 ){
        //         $modules->bottom[$key]->modules[$listKey]->title = $masVistas[$listKey]->titulo;
        //         $media = array('src' => $masVistas[$listKey]->imagen);
        //         $modules->bottom[$key]->modules[$listKey]->thumbnail = (object)$media;
        //         //$slug = str_replace('http://www.milenio.com', '', $masVistas[$listKey]->url);
        //         $slug = $masVistas[$listKey]->url;
        //         $modules->bottom[$key]->modules[$listKey]->content->slug = $slug;
        //       }
        //       else{
        //         unset($modules->bottom[$key]->modules[$listKey]);
        //       }
        //     }
        //   }elseif ($module->type == 'list_small' && $module->template == 'base' && $contentType == 'FIR') {
        //     foreach ($module->modules as $listKey => $listElement) {
        //       if($listKey < 3 && isset($opinionesMasVistas[$listKey])){
        //         $modules->bottom[$key]->modules[$listKey]->title = $opinionesMasVistas[$listKey]->titulo;
        //         $media = array('src' => $opinionesMasVistas[$listKey]->imagen);
        //         $modules->bottom[$key]->modules[$listKey]->thumbnail = (object)$media;
        //         //$slug = str_replace('http://www.milenio.com', '', $opinionesMasVistas[$listKey]->url);
        //         $slug = $opinionesMasVistas[$listKey]->url;
        //         $autor = (isset($opinionesMasVistas[$listKey]->autor)) ? $opinionesMasVistas[$listKey]->autor : '';
        //         $modules->bottom[$key]->modules[$listKey]->content->author->name = $autor;
        //         $modules->bottom[$key]->modules[$listKey]->content->slug = $slug;
        //       }
        //       elseif ($listKey < 3 && !isset($opinionesMasVistas[$listKey])) {
        //         unset($modules->bottom[$key]->modules[$listKey]);
        //       }
        //     }
        //   }
        // }
        $pageObj = $this->getPagination($numPag);
        $arrayCss = array();
        $resultFileCss = array();
        $this->getListModules($modules,$arrayCss);
        if(count($arrayCss)){
          $resultFileCss = array_values(array_unique($arrayCss));
        }
        return $this->render('@CamusAssets/Detail/detail.html.twig', array(
          'modules' => $modules,
          'content' => $content,
          'contentId' => $contentId,
          'contentType' => $contentType,
          'headerType' => 2,
          'currentSection' => $section,
          'gtm' => $tagContainer,
          'page' => $pageObj,
          'ads' => $ads,
          'boardColor' => $boardColor,
          'contentLayer' => $service->data,
          'urlStadistics' => $urlStadistics,
          'tabStadistics' => $tabStadistics,
          'contentUrl' => $slugNew,
          'fileCSS' => $resultFileCss,
        ));
      }
      else{
        throw $this->createNotFoundException();
      }
    }
  }

  public function menuAction($name = null){
    // $menu = $this->getMenu('Home');
    $menu= [
      "sections" =>[
        (object)[
          "id" => 23,
          "identifier" => "WebFotoChic",
          "position"=> 1,
          "title"=> "EVENTOS RECIENTES",
          "tag"=> "EVENTOS RECIENTES",
          "url"=> "#",
          "iconType"=> null,
          "iconUrl"=> null,
          "backgroundType"=> null,
          "backgroundUrl"=> null,
          "contentType"=> null,
          "classType"=> null,
          "startDate"=> null,
          "endDate"=> null,
          "visible"=> true,
          "slug"=> (object)[
            "id"=> 2246,
            "slug"=> "#",
            "board"=> (object)[
              "id"=> 4445,
              "disc"=> "BRD",
            ],
            "section"=> null,
            "place"=> null,
          ],
          "colorTheme"=> "rgba(95,123,137,1)",
          "tagConfig"=> null,
          "idCamus"=> 4445,
          "isTemplate"=> false,
          "section"=> null,
          "data"=> [],
        ],
        (object)[
          "id" => 23,
          "identifier" => "WebFotoChic",
          "position"=> 1,
          "title"=> "FOTOS",
          "tag"=> "FOTOS",
          "url"=> "#",
          "iconType"=> null,
          "iconUrl"=> null,
          "backgroundType"=> null,
          "backgroundUrl"=> null,
          "contentType"=> null,
          "classType"=> null,
          "startDate"=> null,
          "endDate"=> null,
          "visible"=> true,
          "slug"=> (object)[
            "id"=> 2246,
            "slug"=> "#",
            "board"=> (object)[
              "id"=> 4445,
              "disc"=> "BRD",
            ],
            "section"=> null,
            "place"=> null,
          ],
          "colorTheme"=> "rgba(95,123,137,1)",
          "tagConfig"=> null,
          "idCamus"=> 4445,
          "isTemplate"=> false,
          "section"=> null,
          "data"=> [],
        ],
        (object)[
          "id" => 23,
          "identifier" => "WebFotoChic",
          "position"=> 1,
          "title"=> "REVISTA",
          "tag"=> "REVISTA",
          "url"=> "#",
          "iconType"=> null,
          "iconUrl"=> null,
          "backgroundType"=> null,
          "backgroundUrl"=> null,
          "contentType"=> null,
          "classType"=> null,
          "startDate"=> null,
          "endDate"=> null,
          "visible"=> true,
          "slug"=> (object)[
            "id"=> 2246,
            "slug"=> "#",
            "board"=> (object)[
              "id"=> 4445,
              "disc"=> "BRD",
            ],
            "section"=> null,
            "place"=> null,
          ],
          "colorTheme"=> "rgba(95,123,137,1)",
          "tagConfig"=> null,
          "idCamus"=> 4445,
          "isTemplate"=> false,
          "section"=> null,
          "data"=> [],
        ],
        (object)[
          "id" => 23,
          "identifier" => "WebFotoChic",
          "position"=> 1,
          "title"=> "CONTACTO",
          "tag"=> "CONTACTO",
          "url"=> "/contactanos",
          "iconType"=> null,
          "iconUrl"=> null,
          "backgroundType"=> null,
          "backgroundUrl"=> null,
          "contentType"=> null,
          "classType"=> null,
          "startDate"=> null,
          "endDate"=> null,
          "visible"=> true,
          "slug"=> (object)[
            "id"=> 2246,
            "slug"=> "/contactanos",
            "board"=> (object)[
              "id"=> 4445,
              "disc"=> "BRD",
            ],
            "section"=> null,
            "place"=> null,
          ],
          "colorTheme"=> "rgba(95,123,137,1)",
          "tagConfig"=> null,
          "idCamus"=> 4445,
          "isTemplate"=> false,
          "section"=> null,
          "data"=> [],
        ],
        (object)[
          "id" => 23,
          "identifier" => "WebFotoChic",
          "position"=> 1,
          "title"=> "VOLVER AL SITIO",
          "tag"=> "VOLVER AL SITIO",
          "url"=> "/",
          "iconType"=> null,
          "iconUrl"=> null,
          "backgroundType"=> null,
          "backgroundUrl"=> null,
          "contentType"=> null,
          "classType"=> null,
          "startDate"=> null,
          "endDate"=> null,
          "visible"=> true,
          "slug"=> (object)[
            "id"=> 2246,
            "slug"=> "/",
            "board"=> (object)[
              "id"=> 4445,
              "disc"=> "BRD",
            ],
            "section"=> null,
            "place"=> null,
          ],
          "colorTheme"=> "rgba(95,123,137,1)",
          "tagConfig"=> null,
          "idCamus"=> 4445,
          "isTemplate"=> false,
          "section"=> null,
          "data"=> [],
        ]
      ],
      "breadcrumb" =>[],
      "selectedSection" =>"",
      "selectedSectionFather" =>"",
    ];
    $response = $this->render('@CamusAssets/Templates/menu/menu.html.twig', array(
      'name' => $name,
      'jsonData' => $menu
    ));
    $response->setSharedMaxAge(300);
    return $response;
  }
  public function sectionsAction($sectionUrl){
    $section = "Home";
    $menu = $this->getMenu($section);
    $response = $this->render('@CamusAssets/Slices/sections.html.twig', array(
      'jsonData' => $menu,
      'section' => $sectionUrl
    ));
    $response->setSharedMaxAge(600);
    return $response;
  }
  public function breadcrumbsAction($headerType, $section, $part, $currentPath){
    $menu = $this->getMenu($section, $currentPath);
    $response = $this->render('@CamusAssets/Slices/breadcrumbs.html.twig', array(
      'part' => (int)$part,
      'jsonData' => $menu,
      'headerType' => $headerType
    ));
    $response->setSharedMaxAge(600);
    return $response;
  }

  public function getMenu($section, $currentPath= null){
    $httpClient = $this->container->get('httpClient');
    $slug = 'menus/1';
    $service = $httpClient->post($slug);
    $service = json_decode($service->getBody());
    if($service != null){
      $service = $service->data;
    }
    $slug = '/'.$section;
    $breadcrumbs = array();
    $breadcrumbsBack = array();
    $selectedSection = '';
    $selectedSectionFather = '';
    $fullSlug = str_replace("app_dev.php/", "", $currentPath);
    $fullSlug = explode("/", $fullSlug);
    unset($fullSlug[0]);
    $fullSlug = array_merge($fullSlug);
    $slugParts = array();
    // $sectionIndex = 0;
    foreach ($fullSlug as $key => $slice) {
      if (count($breadcrumbsBack) > 0) {
        $newItem = $this->findIn($slice, $breadcrumbsBack[count($breadcrumbsBack) - 1]->data);
      }else{
        $newItem = $this->findIn($slice, $service);
      }
      if($newItem != ""){
        array_push($breadcrumbsBack, $newItem);
      }
    }
    foreach ($service as $key => $value) {
      if(count($value->data) > 0){
        foreach ($value->data as $key => $childValue) {
          if(count($childValue->data) > 0){
            foreach ($childValue->data as $keySubChildValue => $subChildValue) {
              if($slug == $subChildValue->url && $value->identifier != "menuUltimaHora"){
                array_push($breadcrumbs, $value, $childValue,$subChildValue);
                $selectedSectionFather = $value;
                $selectedSection = $childValue;
                break;
              }
            }
          }

          if($slug == $childValue->url && $value->identifier != "menuUltimaHora"){
            array_push($breadcrumbs, $value, $childValue);
            $selectedSection = $value;
            $selectedSectionFather = $value;
            break;
          }
        }
        if(count($breadcrumbs) == 0){
          if($slug == $value->url && $value->identifier != "menuUltimaHora"){
            $selectedSection = $value;
            array_push($breadcrumbs, $value);
            break;
          }
        }
      }
    }

    if (count($breadcrumbsBack) > 0) {
      // if(count($breadcrumbsBack[count($breadcrumbsBack)-1]->data)){
      //   $selectedSection = (count($breadcrumbsBack) > 1) ? $breadcrumbsBack[count($breadcrumbsBack) - 1] : $breadcrumbsBack[0];
      // }else{
      // }
      $selectedSection = (count($breadcrumbsBack) > 1) ? $breadcrumbsBack[count($breadcrumbsBack) - 1] : $breadcrumbsBack[0];
    }
    $menu['sections'] = $service;
    $menu['breadcrumb'] = $breadcrumbsBack;
    $menu['selectedSection'] = $selectedSection;
    $menu['selectedSectionFather'] = $selectedSectionFather;
    return $menu;
  }

  public function findIn($needle,$parent){
    $result = "";
    foreach ($parent as $key => $value) {
      if("/".$needle == $value->url && $value->identifier != "menuUltimaHora"){
        $result = $value;
        break;
      }
    }
    return $result;
  }

  public function modulerenderAction($module, $boardColor = null, $parentId = null){
    if($module == "ticker"){
      $response = $this->render('@CamusAssets/Groups/sli/base.html.twig', array(
        'module' => array("template" => "ticker_caliente"),
      ));
    }else{
      $service = $this->getFromApi('/modules/'.$module);
      $module = $service->data;
      $module = $this->getIndividualModule($module);
      $type = $this->splitTemplate($module['type']);
      $response = $this->render('@CamusAssets/Groups/'.$type[0].'/'.$type[1].'.html.twig', array(
        'module' => $module,
        'boardColor' => $boardColor,
        'parentId' => $parentId
      ));
    }

    $response->setSharedMaxAge(60);
    return $response;
  }
  public function themesAction(){
    $service = $this->postFromApi('/topic_filter/a', array())->data;
    $response = $this->render('@CamusAssets/Slices/ai_theme.html.twig', array(
      'jsonDataTopics' => $service
    ));
    $response->setSharedMaxAge(60);
    return $response;
  }

  public function placesAction($section){
    $service = $this->postFromApi('/places', array())->data;
    $fullSlug = str_replace("app_dev.php/", "", $section);
    $fullSlug = explode("/", $fullSlug);
    unset($fullSlug[0]);
    $fullSlug = array_merge($fullSlug);
    if(count($fullSlug) > 1){
      $section = "Home";
    }
    else{
      $section = $fullSlug[0];
    }
    $response = $this->render('@CamusAssets/Slices/places.html.twig', array(
      'jsonDataPlaces' => $service,
      'currentSection' => $section
    ));

    $response->setSharedMaxAge(7200);
    return $response;
  }

  public function topicListAction(){
    $service = $this->postFromApi('/menu_tags', array())->data;
    $response = $this->render('@CamusAssets/Slices/topics.html.twig', array(
      'jsonDataTopics' => $service
    ));
    $response->setSharedMaxAge(300);
    return $response;
  }

  public function latestTopicsAction(){
    $service = $this->postFromApi('/menu_tags', array())->data;
    $response = $this->render('@CamusAssets/Slices/latest-topics.html.twig', array(
      'jsonDataTopics' => $service
    ));
    $response->setSharedMaxAge(300);
    return $response;
  }

  public function getPagination($page = 1){
    $range = 4;
    $limit = 10;
    $minPage = ( ($page - $range) <= 0 ) ? 1 : $page - $range;
    $maxPage = $minPage + ($limit - 1);
    $activePage = $page;
    $objPage = array();
    $objPage["min"] = $minPage;
    $objPage["max"] = $maxPage;
    $objPage["active"] = $activePage;
    return $objPage;
  }

  public function getFromApi($slug){
    $httpClient = $this->container->get('httpClient');
    $slug = ltrim($slug, '/');
    $service = $httpClient->get($slug);
    if($service->getStatusCode() == 404){
      return false;
    }
    $service = json_decode($service->getbody());

    // $service = file_get_contents($serviceHost.'/api/v1'.$slug);
    // $service = file_get_contents($serviceHost.'/api/v1'.$slug);
    //
    // $service = json_decode($service);

    return $service;
  }

  public function postFromApi($slug, $body){
    $httpClient = $this->container->get('httpClient');
    $slug = ltrim($slug, '/');
    $service = $httpClient->post($slug, ['form_params' => $body]);
    $service = json_decode($service->getbody());
    return $service;
  }

  public function getBoardFromApi($service){
    // $serviceHost = $this->getParameter('service_host');

    // $service = file_get_contents($serviceHost.'/api/v1/boards/'.$id);
    // $service = json_decode($service);
    $board = $service->data;
    if($board == null){
      return null;
    }

    $modules = $board->modules;

    return $modules;
  }

  public function getContentFromApi($service){
    // $serviceHost = $this->getParameter('service_host');
    //
    // $service = @file_get_contents($serviceHost.'/api/v1/contents'.$slug);

    // $service = file_get_contents($serviceHost.'/api/v1/contents'.$slug);
    if($service !== false){
      // $service = json_decode($service);

      // if($service->code == 301){
      //   return $service->data;
      // }

      $board = $service->data;
      if($board == null){
        return null;
      }

      $modules = $board->modules;

      $modulesHead = Array();
      $modulesContent = Array();
      $modulesSide = Array();
      $modulesBottom = Array();

      if (isset($modules->head)) {
        foreach ($modules->head as $key => $value) {
          array_push($modulesHead, $value);
        }
      }
      foreach ($modules->body as $key => $value) {
        array_push($modulesContent, $value);
      }
      if (isset($modules->sidebar)) {
        foreach ($modules->sidebar as $key => $value) {
          array_push($modulesSide, $value);
        }
      }
      if (isset($modules->bottom)) {
        foreach ($modules->bottom as $key => $value) {
          array_push($modulesBottom, $value);
        }
      }

      $modules->head = $modulesHead;
      $modules->body = $modulesContent;
      $modules->sidebar = $modulesSide;
      $modules->bottom = $modulesBottom;

    }
    else{
      return null;
    }
    $response = (object)array();
    $response->modules = $modules;
    return $response;
  }

  public function getOldContentFromApi($slug){
    $serviceHost = $this->getParameter('service_host');
    $service = $this->postFromApi('contents'.$slug, array());
    if($service != null){
      // $service = json_decode($service);
      if($service->code == 301){
        return $service->data;
      }
    }
  }

  public function obtenerIdv2($urlNoticia){
    $errores = 0;
    $idNoticia= -1;
    $contentId = "";
    preg_match('/^.*_(\d{7,})\.html/',$urlNoticia, $matches);
    if(isset($matches[1])) {
      $idNoticia = $matches[1];
      $contentId = $this->intToContentID($idNoticia);
    }
    $object = new \stdClass();
    $object->id = $contentId;
    return $object;
  }

  public function intToContentID($intContentId) {
    $stEpoch = gmmktime(0, 0, 0, 1, 1, 2013); // valor extraño que tiene que ver con el día que se definio
    $stMedIds = array("MIL");
    $stContentTypes = array(0 => "NWS",18 => "FIR",15 => "ENT",16 => "CHR",14 => "RPG",17 => "LIV",1 => "IMA",2 => "AUD",3 => "VID",4 => "POL",5 => "PGL",6 => "PLG",7 => "POS",8 => "FIL",10 => "INF",11 => "EXT",19 => "CRT",13 => "DEB");
    $stMaxMedIds = 3;
    $stMaxContentTypes = 20;
    $stMaxContentsPerDayMedAndType = 9999;
    $stMapExcessContentTypesWithFreeMedIds = false;
    $counter = ($intContentId % $stMaxContentsPerDayMedAndType);
    $intContentId -= $counter;
    $nType = ($intContentId % ($stMaxContentTypes * $stMaxContentsPerDayMedAndType)) / $stMaxContentsPerDayMedAndType;
    $intContentId -= $nType * $stMaxContentsPerDayMedAndType;
    $nMed = ($intContentId % ($stMaxMedIds * $stMaxContentTypes * $stMaxContentsPerDayMedAndType)) / ($stMaxContentTypes * $stMaxContentsPerDayMedAndType);
    if (!isset($stMedIds[$nMed])) {
      if ($stMapExcessContentTypesWithFreeMedIds) {
        $nType += $nMed * $stMaxContentTypes;
        $nMed = key($stMedIds);
      } else {
        throw $this->createNotFoundException();
      }
    }
    $medId = $stMedIds[$nMed];
    $type = $stContentTypes[$nType];
    $intContentId -= $nMed * $stMaxContentTypes* $stMaxContentsPerDayMedAndType;
    $numDays = $intContentId / ($stMaxMedIds * $stMaxContentTypes * $stMaxContentsPerDayMedAndType);
    $contentDate = $stEpoch + ($numDays * 60 * 60 * 24);
    $year = gmdate("Y", $contentDate);
    $month = gmdate("m", $contentDate);
    $day = gmdate("d", $contentDate);
    return $medId . $type . sprintf("%04d", $year) . sprintf("%02d", $month) . sprintf("%02d", $day) . "_" . sprintf("%04d", $counter);
  }

  public function countAds($modules){
    $adCount = 0;
    $ads = array();
    $response = array();
    foreach ($modules as $key => $module) {
      if(isset($module->modules)) {
        foreach ($module->modules as $subKey => $subValue) {
          if($subValue != null){
            if(strpos($subValue->type, 'ad_') !== false){
              $adCount++;
              $modules[$key]->modules[$subKey]->adPos = $adCount;
              $modules[$key]->modules[$subKey]->adId = random_int(1, 1000000000);
              array_push($ads, $modules[$key]->modules[$subKey]);
            }
            if (strpos($subValue->type, 'list_small') !== false || strpos($subValue->type, 'ctr_modules') !== false) {
              foreach ($subValue->modules as $doubleSubKey => $doubleSubValue) {
                if(strpos($doubleSubValue->type, 'ad_') !== false){
                  $adCount++;
                  $modules[$key]->modules[$subKey]->modules[$doubleSubKey]->adPos = $adCount;
                  $modules[$key]->modules[$subKey]->modules[$doubleSubKey]->adId = random_int(1, 1000000000);
                  array_push($ads, $modules[$key]->modules[$subKey]->modules[$doubleSubKey]);
                }
              }
            }
          }
        }
      }
    }
    $response['modules'] = $modules;
    $response['ads'] = $ads;

    return $response;
  }

  public function countAdsDetail($modules){
    $adCount = 0;
    $ads = array();
    $response = array();
    foreach ($modules as $key => $module) {
      if ($module != null) {
        foreach ($module as $subKey => $subValue) {
          if($subValue != null){
            if(isset($subValue->type)){
              if(strpos($subValue->type, 'ad_') !== false){
                $adCount++;
                $subValue->adPos = $adCount;
                $subValue->adId = random_int(1, 1000000000);
                array_push($ads, $subValue);
              }
              if (strpos($subValue->type, 'list_small') !== false) {
                foreach ($subValue->modules as $doubleSubKey => $doubleSubValue) {
                  if(strpos($doubleSubValue->type, 'ad_') !== false){
                    $adCount++;
                    $subValue->modules[$doubleSubKey]->adPos = $adCount;
                    $subValue->modules[$doubleSubKey]->adId = random_int(1, 1000000000);
                    array_push($ads, $subValue->modules[$doubleSubKey]);
                  }
                }
              }
            }
          }
        }
      }
    }
    $response['modules'] = $modules;
    $response['ads'] = $ads;
    return $response;
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

  /**
  * @Route("/{url}", name="remove_trailing_slash",
  *     requirements={"url" = ".*\/$"}, methods={"GET"})
  */
  public function removeTrailingSlashAction(Request $request)
  {
    $pathInfo = $request->getPathInfo();
    $requestUri = $request->getRequestUri();

    $url = str_replace($pathInfo, rtrim($pathInfo, ' /'), $requestUri);

    return $this->redirect($url, 301);
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

  public function getIndividualModule($modelData){
    $modelFilter = $this->container->get('moduleFilter');
    $module = $modelFilter->getModelModule($modelData);

    return $module;
  }

  public function transformImage($image){
    $file = 'bundles/camusassets/images/logo-Milenio-2.jpg';

    if (file_exists(str_replace("http://www.milenio.com/","",$image))) {
      $file =str_replace("http://www.milenio.com/","",$image);
    }
    $img_link = fopen($file,"rb"); // rb modo binario para windows .. r para linux

    $filename = basename($file);
    $file_extension = strtolower(substr(strrchr($filename,"."),1));
    switch( $file_extension ) {
        case "gif": $ctype="image/gif"; break;
        case "png": $ctype="image/png"; break;
        case "jpeg":
        case "jpg": $ctype="image/jpeg"; break;
        default:
    }
    header('Content-type: ' . $ctype);
    if(!is_bool($img_link)){
      while (!feof ($img_link)){
        $img_des = fgets ($img_link, 4096);
        echo $img_des;
      }
    }
    fclose($img_link);
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
  public function getListModules($modules,& $arrayModules){
    foreach ($modules as $module) {
      $type = $this->splitTemplate($module->type);
      $template = $module->template;
      // $template = $this->splitTemplate($module->template);
      // if($template[0] == end($type[1])){
      //   $template = $template[1];
      // }else{
      //   $template = implode("-", $template);
      // }
      $fileCSS = $type[0]."/".str_replace("_","-",$type[1])."/".str_replace("_","-",$template).".css";
      array_push($arrayModules,$fileCSS);
      $this->getListModules($module,$arrayModules);
    }
  }
}
