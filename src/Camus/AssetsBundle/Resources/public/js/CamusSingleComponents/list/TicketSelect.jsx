import React from 'react';
import $ from "jquery";
import ReactDOM from 'react-dom';

class TicketSelect extends React.Component {
  constructor(props) {
    super(props);
    this.initialize();
  }

  initialize() {
    $(".eventSelect").change(function(){
      var category = this.value;
      var select = $(this);
      $.ajax({
        method: 'POST',
        url: '/tickets/'+category,
        data: {
          size: 9,
          page: 1,
          group: 'event'
        },
        success: function(data){
          var elementsContainer = select.parent().siblings('.list');
          elementsContainer.empty().append(data);
        }
      })
    });
    var that = this;
    $('.eventBlockSelect').change(function(){
      var category = this.value;
      var select = $(this);
      $.ajax({
        method: 'POST',
        url: '/tickets/'+category,
        data: {
          size: 9,
          page: 1,
          group: 'category'
        },
        success: function(data){
          var elementsContainer = select.parent().find('.last-month, .events-container, .last-month-separator');
          elementsContainer.remove();
          select.after(data);
          var totalPages = select.parent().find('.last-month').first().attr('data-pages');
          var pager = select.parent().find('.pager');
          pager.find('.page').remove();
          var newPages = '';
          for (var i = 1; i <= totalPages; i++) {
            if (i < 11) {
              newPages += that.createPage(i);
            }
          }
          pager.find('.previous').after(newPages);
          var pages = pager.find('.page');
          pages.removeClass('selected');
          pages.first().addClass('selected');
          that.bindButtons();
          that.bindPages();
        }
      })
    });

    $(".ctr-tickets .pager .next").click(function(){
      var category = $(this).parent().siblings('.eventBlockSelect').val();
      var page = parseInt($(this).siblings('.selected').text());
      page = page + 1;
      var clickedPage = $(this);
      var totalPages = $(this).parent().siblings('.last-month').first().attr('data-pages');
      if (page <= parseInt(totalPages)) {
        var pageRange = that.maxAndMin(page, totalPages);
        var pagesToAdd = '';
        for (var pageIndex of pageRange) {
          pagesToAdd += that.createPage(pageIndex);
        }
        var pager = $(this).parent();
        pager.find('.page').remove();
        pager.find('.previous').after(pagesToAdd);
      }
      var clickedPage = pager.find('.page[camus-page="'+page+'"]');
      $.ajax({
        method: 'POST',
        url: '/tickets/'+category,
        data: {
          size: 9,
          page: page,
          group: 'category'
        },
        success: function(data){
          // var currentPage = clickedPage.siblings('.selected');
          // currentPage.removeClass('selected');
          clickedPage.addClass('selected');
          var elementsContainer = clickedPage.parent().siblings('.last-month, .events-container, .last-month-separator');
          elementsContainer.remove();
          clickedPage.parent().before(data);
          that.bindButtons();
          that.bindPages();
        }
      })
    });

    $(".ctr-tickets .pager .previous").click(function(){
      var category = $(this).parent().siblings('.eventBlockSelect').val();
      var page = parseInt($(this).siblings('.selected').text());
      page = (page - 1 > 0) ? page - 1: page = 1;
      var clickedPage = $(this);
      var totalPages = $(this).parent().siblings('.last-month').first().attr('data-pages');
      var pageRange = that.maxAndMin(page, totalPages);
      var pagesToAdd = '';
      for (var pageIndex of pageRange) {
        pagesToAdd += that.createPage(pageIndex);
      }
      var pager = $(this).parent();
      pager.find('.page').remove();
      pager.find('.previous').after(pagesToAdd);
      var clickedPage = pager.find('.page[camus-page="'+page+'"]');
      $.ajax({
        method: 'POST',
        url: '/tickets/'+category,
        data: {
          size: 9,
          page: page,
          group: 'category'
        },
        success: function(data){
          // var currentPage = clickedPage.siblings('.selected');
          // currentPage.removeClass('selected');
          clickedPage.addClass('selected');
          var elementsContainer = clickedPage.parent().siblings('.last-month, .events-container, .last-month-separator');
          elementsContainer.remove();
          clickedPage.parent().before(data);
          that.bindButtons();
          that.bindPages();
        }
      })
    });

    $(".ctr-tickets .fa-search").click(function(){
      var searchTerm = $(this).siblings("input").val();
      var clickedButton = $(this);
      if (searchTerm.length > 0) {
        $.ajax({
          method: 'POST',
          url: '/tickets/search',
          data: {
            search: searchTerm
          },
          success: function(data){
            var elementsContainer = clickedButton.parent().parent().siblings('.last-month, .events-container, .last-month-separator');
            elementsContainer.remove();
            clickedButton.parent().parent().after(data);
          }
        });
      }
      else{
        alert("Introduce un término de búsqueda");
      }
    });
    that.bindPages();
    that.bindButtons();
  }

  bindButtons(){
    $('.ctr-tickets .event .view').click(function(){
      var eventContainer = $(this).parent().parent().parent();
      eventContainer.toggleClass('view-tickets');
    });
  }

  bindPages(){
    var that = this
    $(".ctr-tickets .pager .page").click(function(){
      var category = $(this).parent().siblings('.eventBlockSelect').val();
      var page = $(this).text();
      var clickedPage = $(this);
      var totalPages = $(this).parent().siblings('.last-month').first().attr('data-pages');
      var pageRange = that.maxAndMin(page, totalPages);
      var pagesToAdd = '';
      for (var pageIndex of pageRange) {
        pagesToAdd += that.createPage(pageIndex);
      }
      var pager = $(this).parent();
      pager.find('.page').remove();
      pager.find('.previous').after(pagesToAdd);
      var clickedPage = pager.find('.page[camus-page="'+page+'"]');
      $.ajax({
        method: 'POST',
        url: '/tickets/'+category,
        data: {
          size: 9,
          page: page,
          group: 'category'
        },
        success: function(data){
          var elementsContainer = clickedPage.parent().siblings('.last-month, .events-container, .last-month-separator');
          elementsContainer.remove();
          // var currentPage = clickedPage.siblings('.selected');
          // currentPage.removeClass('selected');
          clickedPage.addClass('selected');
          // currentPage.siblings(".page[camus-page='"+page+"']").addClass('selected');
          clickedPage.parent().before(data);
          that.bindButtons();
          that.bindPages();
        }
      })
    });
  }

  createPage(number){
    return '<span class="page" camus-page="'+number+'">'+number+'</span>';
  }

  maxAndMin(current, pages){
    var min = (current - 5 < 1) ? 1 : current - 5;
    var max = (min + 9 > pages) ? pages : min + 9;
    max = (max > pages) ? pages : max;
    var pageRange = [];
    for(var i = min; i <= max; i++){
      pageRange.push(i);
    }
    return pageRange;
  }
}

export default TicketSelect;
