import shareThis from "share-this";
import * as twitterSharer from "share-this/dist/sharers/twitter";
import * as facebookSharer from "share-this/dist/sharers/facebook";
import * as emailSharer from "share-this/dist/sharers/email";
import * as whatsappSharer from "./sharers/whatsapp";
import $ from "jquery";

function shareSelectedText() {
    var contentBodyElement = "#content-body, .nd-th-base .summary, *[data-camus-title], *[data-camus-abstract], *[data-camus-heading-title], *[data-camus-body], *[data-camus-author]";
    if($(contentBodyElement).length) {
      var selectionShare = shareThis({
        popoverClass: "share-text",
        selector: contentBodyElement,
        sharers: [facebookSharer, twitterSharer, whatsappSharer, emailSharer]
      });

      selectionShare.init();
    }
  }


export { shareSelectedText };
