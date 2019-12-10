<?php
// src/AppBundle/Twig/AppExtension.php
namespace App\Camus\AssetsBundle\Twig;

use Twig\Extension\AbstractExtension;
use Twig\Extension\GlobalsInterface;

class ModelAttributeExtension extends AbstractExtension implements GlobalsInterface
{

  public function getGlobals()
  {
    $dataCamusTemplate = "data-camus-template=";
    $dataCamusType = "data-camus-type=";
    $dataCamusModuleType = "data-camus-module-type=";
    $dataCamusElement = "data-camus-module-show-just-one-";
    $dataCamusRemovable = "data-camus-removable=";
    $dataCamusTextLimit = "data-camus-text-limit=";
    $dataCamusToolbarPosition = "data-camus-toolbar-position=";

    return array(
      "data_camus_abstract"     => "data-camus-abstract",
      "data_camus_author"       => "data-camus-author",
      "data_camus_profession"   => "data-camus-profession",
      "data_camus_column"   => "data-camus-column",
      "data_camus_heading_title"      => "data-camus-heading-title",
      "data_camus_module_color_contrast"      => "data-camus-module-color-contrast",
      "data_camus_heading_background"      => "data-camus-color=color",
      "data_camus_media"        => "data-camus-media",
      "data_camus_modules"      => "data-camus-modules",
      "data_camus_section"      => "data-camus-section",
      "data_camus_title"        => "data-camus-title",
      "data_camus_background_color"        => "data-camus-color=background-color",
      "data_camus_color"        => "data-camus-color=color",
      "data_camus_border_color"        => "data-camus-color=border-color",
      "data_camus_color_alpha"        => "data-camus-color-alpha=0.5",
      "data_camus_body"         => "data-camus-body",
      "data_camus_background"   => "data-camus-background",
      "data_camus_module_free_html" => "data-camus-module-free-html",
      "data_camus_link"         => "data-camus-link",
      "data_camus_poll_options"  => "data-camus-poll-options",
      "data_camus_extra_heading_title" => "data-camus-extra-heading-title",
      "data_camus_extra_media_title" => "data-camus-extra-media-title",
      "data_camus_extra_media_icon" => "data-camus-extra-media-icon",
      "data_camus_period_match" => "data-camus-period-match",
      "data_camus_minute_match" => "data-camus-minute-match",
      "data_camus_team_home" => "data-camus-team-home",
      "data_camus_score_home" => "data-camus-score-home",
      "data_camus_penalties_home" => "data-camus-penalties-home",
      "data_camus_team_away" => "data-camus-team-away",
      "data_camus_score_away" => "data-camus-score-away",
      "data_camus_penalties_away" => "data-camus-penalties-away",
      "data_camus_no_content" => "data-camus-no-content",
      "data_camus_no_thumbnail" => "data-camus-no-thumbnail",
      "data_camus_date_button" => "data-camus-date-button",
      "data_camus_author_button" => "data-camus-author-button",
      "data_camus_sponsor" => "data-camus-sponsor",
      "data_camus_module_linked_elem" => "data-camus-module-linked-elem",
      "data_camus_module_audio_elem" => "data-camus-module-audio-elem",
      "data_camus_module_tab" => "data-camus-module-tab",
      "data_camus_module_tab_content" => "data-camus-module-tab-content",
      "data_camus_module_color_text" => "data-camus-module-color-text",
      "data_camus_extra_media_indicator" => "data-camus-extra-media-indicator",
      "data_camus_stadistic_league" => "data-camus-stadistic-league",
      "data_camus_template" => [
        // list-row & rows-detail
        "rb"   => "$dataCamusTemplate"."row_base",
        "rbm"  => "$dataCamusTemplate"."row_base_media",
        "rli"  => "$dataCamusTemplate"."row_left_image",
        "rto"  => "$dataCamusTemplate"."row_text_only",
        "rbu"  => "$dataCamusTemplate"."row_bullet",
        "rr"   => "$dataCamusTemplate"."row_radio",
        "rtv"  => "$dataCamusTemplate"."row_tv",
        "rn"   => "$dataCamusTemplate"."row_news",
        "rmi"  => "$dataCamusTemplate"."row_media_icon",
        "rmd"  => "$dataCamusTemplate"."row_media_description",
        "rp"   => "$dataCamusTemplate"."row_printed",
        "rs"   => "$dataCamusTemplate"."row_specials",
        "rm"   => "$dataCamusTemplate"."row_medium",
        "frame"   => "$dataCamusTemplate"."frame",
        // small-news
        "bas"  => "$dataCamusTemplate"."base",
        "ft"   => "$dataCamusTemplate"."foot_text",
        "cen"  => "$dataCamusTemplate"."centered",
        "bt"   => "$dataCamusTemplate"."bottom_text",
        "btg"  => "$dataCamusTemplate"."bottom_text_growable",
        "btgl" => "$dataCamusTemplate"."bottom_text_growable_left",
        "mid"  => "$dataCamusTemplate"."middle"],
      "data_camus_type"         => [
        "lr_list_row"    => "$dataCamusType"."lr_list_row",
        "lr_rows_detail" => "$dataCamusType"."lr_rows_detail",
        "sn_base"        => "$dataCamusType"."sn_base",
        "sn_frame"        => "$dataCamusType"."sn_frame",
        "sn_opinion"     => "$dataCamusType"."sn_opinion",
        "sn_radio"       => "$dataCamusType"."sn_radio",
        "list_small"       => "$dataCamusType"."list_small",
        "sn_social_widget" => "$dataCamusType"."sn_social_widget",
        "ai_element" => "$dataCamusType"."ai_element"],
      "data_camus_module_type"  => [
        "sli"  => "$dataCamusModuleType"."sli",
        "list" => "$dataCamusModuleType"."list",
        "mod"  => "$dataCamusModuleType"."module",
        "ad"   => "$dataCamusModuleType"."ad",
        "tabbed" => "$dataCamusModuleType"."tabbed",
        "match" => "$dataCamusModuleType"."match",
        "ai" => "$dataCamusModuleType"."ai",
        "league" => "$dataCamusModuleType"."league",
        "club" => "$dataCamusModuleType"."club",
        "csn" => "$dataCamusModuleType"."csn"],
      "data_camus_module_show_just_one" => [
        "author"  => "$dataCamusElement"."1=autor",
        "sponsor" => "$dataCamusElement"."1=patrocinador",
        "section" => "$dataCamusElement"."1=seccion"],
      "data_camus_removable" => [
        "header" => "$dataCamusRemovable"."Header",
        "image" => "$dataCamusRemovable"."Imagen",
        "icon" => "$dataCamusRemovable"."Icono",
        "author" => "$dataCamusRemovable"."Autor",
        "section" => "$dataCamusRemovable"."Sección",
        "title" => "$dataCamusRemovable"."Titulo",
        "abstract" => "$dataCamusRemovable"."Sumario",
        "sponsor" => "$dataCamusRemovable"."Patrocinador",
        "penalti" => "$dataCamusRemovable"."Penalties"],
      "data_camus_text_limit" => [
        "60" => "$dataCamusTextLimit"."60",
        "70" => "$dataCamusTextLimit"."70",
        "100" => "$dataCamusTextLimit"."100",
        "160" => "$dataCamusTextLimit"."160",
        "45" => "$dataCamusTextLimit"."45"],
      "data_camus_toolbar_position" => [
        "tl" => "$dataCamusToolbarPosition"."topleft",
        "tr" => "$dataCamusToolbarPosition"."topright",
        "bl" => "$dataCamusToolbarPosition"."bottomleft",
        "br" => "$dataCamusToolbarPosition"."bottomright",
        ],
        "data_camus_penalties_points_home" => "data-camus-penalties-points-home",
        "data_camus_penalties_points_away" => "data-camus-penalties-points-away",
        "data_camus_allow_empty_module" => [
          "1"=>"data-camus-allow-empty-module=true"
          ],
        "data_camus_modal_tools"=> [
          "1"=> "data-camus-modal-tools=true"
          ]
    );
  }
}
?>
