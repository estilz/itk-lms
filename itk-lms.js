/*Place your JS code here*/

window.heap=window.heap||[],heap.load=function(e,t){window.heap.appid=e,window.heap.config=t=t||{};var r=t.forceSSL||"https:"===document.location.protocol,a=document.createElement("script");a.type="text/javascript",a.async=!0,a.src=(r?"https:":"http:")+"//cdn.heapanalytics.com/js/heap-"+e+".js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(a,n);for(var o=function(e){return function(){heap.push([e].concat(Array.prototype.slice.call(arguments,0)))}},p=["addEventProperties","addUserProperties","clearEventProperties","identify","resetIdentity","removeEventProperty","setEventProperties","track","unsetEventProperty"],c=0;c<p.length;c++)heap[p[c]]=o(p[c])};
heap.load("4137976357");

function itkrefreshcourselist() {
    $('.ef-entry-link').each(function( index ) {
		var efentrylink = $(this);
        var coursetitle = $(this).text();
        var courseimage = $('img[alt="' + coursetitle + '"]');
		var courseurl = $(this).attr('href');
        var courseimageurl = courseimage.css('background-image');
        courseimageurl = courseimageurl.replace('url(','').replace(')','').replace(/\"/gi, "");
        var newimagehtml = "<img class='itk-course-img' src='" + courseimageurl + "'>";
        $(this).parent().parent().prepend(newimagehtml);
		$.get(courseurl, function(data, status){
        	var response = $('<html />').html(data);
			var shortdesc = response.find('#ef-description-short').html();
			var coursebuttontext = response.find('.ef-main-action-button a').text().trim();
          if(coursebuttontext.length > 20) {
            coursebuttontext = coursebuttontext.substring(0,16);     
          }
			var coursebuttonlink = response.find('.ef-main-action-button a').attr('href');
			efentrylink.append("<div class='itk-course-description'>" + shortdesc + "</div>");
			var coursebuttonhtml = "<a class='itk-launch-button' href='" + coursebuttonlink+ "'>" + coursebuttontext + "</a>";
			if (coursebuttontext.length > 0) {         
                efentrylink.parent().parent().parent().parent().find("#ef-my-courses-list-handles").prepend(coursebuttonhtml);
            }
    	});
	});
    $('.ef-entry-title').each(function( index ) {
		$(this).removeClass('col-sm-8');
		$(this).addClass('col-sm-10');
    });
    $('.ef-my-courses-progress-bar').parent().each(function( index ) {
		$(this).removeClass('col-sm-4');	
		$(this).addClass('col-sm-2');	
    });
    $('.ef-my-courses-category .col-sm-4').each(function( index ) {
		$(this).removeClass('col-sm-4');	
		$(this).addClass('col-sm-2');	
    });
}

function itkmovesearchrow() {
    $('.sortedTableFooter').each(function( index ) {
		var formhtml = $(this).find('.form-inline').html();
		if (formhtml.length > 0) {
			var thistable = $(this).parents('.sortedTable tbody');
			$(this).parent().prependTo(thistable).addClass('itk-search-row');
        }
    });
}


function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
function eraseCookie(name) {   
    document.cookie = name+'=; Max-Age=-99999999;';  
}

$( document ).ready(function() {
  var efuserIsDeclared = true; 
  try{ ef_current_user; }
  catch(e) {
    if(e.name == "ReferenceError") {
      efuserIsDeclared = false;
    }
  }
  if (efuserIsDeclared) {
    console.log(ef_current_user.email);
    var itkuserid = $(".ef-switch-account.current").attr("data-id");
    var itkuseremail = ef_current_user.email;
    var itkuserfirstname = ef_current_user.name;
    var itkuserlastname = ef_current_user.surname;
    var itkusercookie = getCookie('itkuser');
    if (itkusercookie) {
      console.log(itkusercookie);
      if (itkusercookie == itkuserid) {
        console.log('cookie is id');
      } else {
        console.log('cookie is not id so reset it');
        heap.resetIdentity(); 
      	setCookie('itkuser',itkuserid,180);        
      }
    } else {
      console.log('set cookie new');
      setCookie('itkuser',itkuserid,180);
    }
    console.log('identify');
    heap.identify(itkuserid, 'ID');
    heap.addUserProperties({"email": itkuseremail});
    heap.addUserProperties({"First Name": itkuserfirstname});
    heap.addUserProperties({"Last Name": itkuserlastname});
  } else {
    console.log('no');  
    $('.honor-welcome-h2').parent().parent().parent().parent().parent().addClass('itk-welcome-box').prependTo('#ef-index-page');
    $('.cb-h2-9').first().parent().addClass('itk-welcome-box').prependTo('#ef-index-page').css('text-align', 'center');
  }  
});

$( document ).ready(function() {
  itkrefreshcourselist();
  itkmovesearchrow();
  $('.graph-header').parent().addClass('itk-graph');
  if(window.location.href === "https://honor.learn.knowingmore.com/"){
  }   
});

$(document).ajaxComplete(function (event, xhr, settings) {
     if ( settings.url.includes("/start/show/") || settings.url.includes("/start/order/") ) {
 		itkrefreshcourselist();
      }
     if ( settings.url.includes("/ajax/") ) {
 		itkmovesearchrow();
      }
});




// new JS for testing




jQuery(document).ready(function() {
  var usertype = jQuery('.ef-switch-account.current').clone().children().remove().end().text().trim();
  console.log(usertype);

  if (usertype == 'Learner') {

    jQuery('body').wrapInner('<div class="mmenu-container"></div>');
    var mmenunav = '<nav id="my-menu"><ul><li><a href="/33/home">Home</a></li><li><a href="/start/?showcourses">Courses</a></li><li><a href="/35/achievements">Achievements</a></li><li><a href="/messages/tab/incoming">Messages</a></li><li><a href="/34/support">Support</a></li></ul></nav>';
    var desktopnav = '<nav id="desktop-nav"><ul><li><a href="/33/home">Home</a></li><li><a href="/start/?showcourses">Courses</a></li><li><a href="/35/achievements">Achievements</a></li><li><a href="/messages/tab/incoming">Messages</a></li><li><a href="/34/support">Support</a></li></ul></nav>';
    jQuery('.mmenu-container').append(mmenunav).append(desktopnav);
    jQuery('#ef-navigation').prepend('<li class="hidden-sm hidden-md hidden-lg hidden-xl" id="m-nav-menu-open"><a href="javascript:void(0);"><i class="fa fa-bars fa-inverse-lg"></i></a></li>');
    jQuery('#ef-navbar .img-overlay').after('<span class="new-name"><span class="new-name-name">' + ef_current_user.name + ' ' + ef_current_user.surname + '</span><br>'+ usertype +'</span>');
    jQuery('#my-menu').mmenu({
      // options
    }, {
      // configuration
      classNames: {
        fixedElements: {
          fixed: "xnavbar",
          sticky: "xsticky"
        }
      }
    });
    var API = jQuery("#my-menu").data( "mmenu" );
    jQuery("#m-nav-menu-open").click(function() {
      API.open();
    });
    jQuery('.breadcrumb-x').after('<div class="container page-header"><div class="page-header-back"><a href="#">Back</a></div><div class="page-header-title">Title</div></div>');
    var breadcrumbcount = jQuery('.breadcrumb-x .visible-lg li a').length;
    var thistitle = jQuery('.breadcrumb-x .visible-lg li a').last().text();
    var backtitle = '';
    var backlink = '';
    if (breadcrumbcount > 2) {
      var backtitle = jQuery('.breadcrumb-x .visible-lg li a').eq(-2).text();
      var backlink = jQuery('.breadcrumb-x .visible-lg li a').eq(-2).attr('href');
      jQuery('.page-header-title').text(thistitle);
      jQuery('.page-header-back a').text('< ' + backtitle).attr('href',backlink);	
    } else {
      jQuery('.page-header-title').text(thistitle);
      jQuery('.page-header-back a').text('' + backtitle).attr('href',backlink);
    }

    jQuery('.alert').parent('.container').insertBefore('.breadcrumb-x');
    jQuery('.alert').parent().siblings('.page-header').addClass('no-top-margin');

    if (window.location.href.indexOf("home") > -1) {
      console.log("home");
      jQuery("body").addClass("page-home");
      jQuery('.page-header').hide();
      jQuery('#desktop-nav li:nth-of-type(1)').addClass('active');
      jQuery('.welcome-hi').text('Hi ' + ef_current_user.name + '! Welcome to your Caregiver Training Portal')
    }
    if (window.location.href.indexOf("/start") > -1) {
      console.log("start");
      jQuery("body").addClass("page-courses");
      jQuery('.page-header-back a').text('' + backtitle).attr('href',backlink);
      jQuery('#desktop-nav li:nth-of-type(2)').addClass('active');
    }

    if (window.location.href.indexOf("cstart") > -1) {
      console.log("home");
      jQuery("body").addClass("page-course-overview");
      var backtitle = jQuery('.breadcrumb-x .visible-lg li a').eq(-2).text();
      var backlink = jQuery('.breadcrumb-x .visible-lg li a').eq(-2).attr('href');
      jQuery('.page-header-back a').text('< ' + backtitle).attr('href',backlink);
      jQuery('#desktop-nav li:nth-of-type(2)').addClass('active');
      var unitnumber = jQuery('.unit-entry').length;
      if (unitnumber < 2) {
        jQuery('.ef-course-progress-bar').hide();
      }
    }

    if (window.location.href.indexOf("content") > -1) {
      console.log("content");
      jQuery("body").addClass("page-course-play");
      jQuery('.page-header-back a').text('< Course Overview').attr('href',backlink);
      jQuery('.ef-center-section').removeClass('col-md-9').addClass('col-md-12');
      jQuery('.ef-side-section').hide();
      jQuery('#desktop-nav li:nth-of-type(2)').addClass('active');
      var unitnumber = jQuery('.unit-entry').length;
      if (unitnumber < 2) {
        jQuery('.progress').hide();
      }

      jQuery('.page-header-title').append('<span class="show-details">Show details</span>');

      jQuery('.show-details').click(function() {
        var thistext = jQuery(this).text();
        if (thistext == 'Show details') {
          jQuery('.ef-center-section').removeClass('col-md-12').addClass('col-md-9');
          jQuery('.ef-side-section').show();
          jQuery('.show-details').text('Fullwidth');        
        } else {
          jQuery('.ef-center-section').removeClass('col-md-9').addClass('col-md-12');
          jQuery('.ef-side-section').hide();
          jQuery('.show-details').text('Show details');             
        }
      });

      jQuery('.fullwidth').click(function() {
        jQuery('.ef-center-section').removeClass('col-md-9').addClass('col-md-12');
        jQuery('.ef-side-section').hide();
        jQuery('.fullwidth').removeClass('fullwidth').addClass('show-details').text('Show details');
      });
    }

    if (window.location.href.indexOf("achievements") > -1) {
      console.log("achievements");
      jQuery("body").addClass("page-achievements");
      jQuery('#desktop-nav li:nth-of-type(3)').addClass('active');
      var profilebaseurl = $('a.dropdown-item[href*="/users/edit/"]').attr('href');
      var certificatesurl = profilebaseurl + '/tab/certificates';
      var badgesurl = profilebaseurl + '/tab/badges';
      console.log(certificatesurl);
      console.log(badgesurl);

      $.get(badgesurl, function(data, status){
        var response = $('<html />').html(data);
        var badgessection = response.find('#custom_badge').parent().parent().html();
        jQuery('#ef-index-page').prepend(badgessection);
        jQuery('#ef-index-page').prepend(badgessection);
        jQuery('#ef-index-page').prepend(badgessection);
        jQuery('legend:eq(-2)').text('Specialist Badges');
        jQuery('.category-badges:eq(-2) div').hide();
        jQuery('legend:eq(-1)').text('Certificates');
        jQuery('.category-badges:eq(-1) div').hide();
        var hackbadge = '<div class="lp-badges"><img src="https://www.knowingmore.com/wp-content/uploads/2018/09/ITK-Dementia-Specialist-Badge.png"></div>';
        jQuery('.category-badges:eq(-2)').prepend(hackbadge);
      });

      $.get(certificatesurl, function(data, status){
        var response = $('<html />').html(data);
        var tablegrab = response.find('#certificatesTable').parent().parent().parent().html();
        jQuery('.category-badges:eq(-1)').after(tablegrab);
        var certificateshtml = '<tr class="defaultRowHeight  oddRowColor "><td class="ef-certificate-name">Feeding Your Clients<span class="label label-course">Course</span></td><td class="text-center">08/14/2018 16:21</td><td class="text-center ef-certificate-expiration-date">08/14/2020 16:21</td><td class="text-center ef-certificate-revoke-date">-</td><td class="text-center"><a class="fa fa-lg fa-eye fa-fw" href="https://learn.knowingmore.com/certificates/view/6" target="_new" title="Preview" alt="Preview"></a></td></tr>'
        jQuery('#certificatesTable .oddRowColor').hide();
        jQuery('#certificatesTable tbody').append(certificateshtml);
        jQuery('h1').parent().parent().hide();
      });

    }

    if (window.location.href.indexOf("support") > -1) {
      console.log("support");
      jQuery("body").addClass("page-support");
      jQuery('#desktop-nav li:nth-of-type(4)').addClass('active');
    }
    if (window.location.href.indexOf("messages") > -1) {
      console.log("messages");
      jQuery("body").addClass("page-messages");
      jQuery('#desktop-nav li:nth-of-type(5)').addClass('active');
    }
    if (window.location.href.indexOf("users") > -1) {
      console.log("users");
      jQuery("body").addClass("page-users");
    }
  }

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
    if (usertype == 'Training Manager') {

    jQuery('body').wrapInner('<div class="mmenu-container"></div>');
      jQuery('body').addClass('manager');
    var mmenunav = '<nav id="my-menu"><ul><li><a href="/33/home">Home</a></li><li><a href="/start/?showcourses">Courses</a></li><li><a href="/35/achievements">Achievements</a></li><li><a href="/34/support">Support</a></li><li><a href="/messages/tab/incoming">Messages</a></li></ul></nav>';
    var desktopnav = '<nav id="desktop-nav"><ul><li><a href="/33/home">Home</a></li><li><a href="#">Course Management</a></li><li class="indent"><a href="/courses">Courses</a></li><li class="indent"><a href="/curriculums">Learning Paths</a></li><li class="indent"><a href="/categories">Categories</a></li><li class="indent"><a href="/certificates">Certificates</a></li><li><a href="#">User Management</a></li><li class="indent"><a href="/users">Users</a></li><li class="indent"><a href="/groups">Groups</a></li><li class="indent"><a href="/branches">Branches</a></li><li><a href="#">Admin Actions</a></li><li class="indent"><a href="/system-config">Branch Settings</a></li><li class="indent"><a href="/reports">Actions & Reports</a></li><li class="indent"><a href="/maintenance">Mass Import</a></li><li><a href="/34/support">Support</a></li><li><a href="/messages/tab/incoming">Messages</a></li></ul></nav>';
    jQuery('.mmenu-container').append(mmenunav).append(desktopnav);
    jQuery('#ef-navigation').prepend('<li class="hidden-sm hidden-md hidden-lg hidden-xl" id="m-nav-menu-open"><a href="javascript:void(0);"><i class="fa fa-bars fa-inverse-lg"></i></a></li>');
    jQuery('#ef-navbar .img-overlay').after('<span class="new-name"><span class="new-name-name">' + ef_current_user.name + ' ' + ef_current_user.surname + '</span><br>'+ usertype +'</span>');
    jQuery('#my-menu').mmenu({
      // options
    }, {
      // configuration
      classNames: {
        fixedElements: {
          fixed: "xnavbar",
          sticky: "xsticky"
        }
      }
    });
    var API = jQuery("#my-menu").data( "mmenu" );
    jQuery("#m-nav-menu-open").click(function() {
      API.open();
    });
    jQuery('.breadcrumb-x').after('<div class="container page-header"><div class="page-header-back"><a href="#">Back</a></div><div class="page-header-title">Title</div></div>');
    var breadcrumbcount = jQuery('.breadcrumb-x .visible-lg li a').length;
    var thistitle = jQuery('.breadcrumb-x .visible-lg li a').last().text();
    var backtitle = '';
    var backlink = '';
    if (breadcrumbcount > 2) {
      var backtitle = jQuery('.breadcrumb-x .visible-lg li a').eq(-2).text();
      var backlink = jQuery('.breadcrumb-x .visible-lg li a').eq(-2).attr('href');
      jQuery('.page-header-title').text(thistitle);
      jQuery('.page-header-back a').text('< ' + backtitle).attr('href',backlink);	
    } else {
      jQuery('.page-header-title').text(thistitle);
      jQuery('.page-header-back a').text('' + backtitle).attr('href',backlink);
    }

    jQuery('.alert').parent('.container').insertBefore('.breadcrumb-x');
    jQuery('.alert').parent().siblings('.page-header').addClass('no-top-margin');

    if (window.location.href.indexOf("home") > -1) {
      console.log("home");
      jQuery("body").addClass("page-home");
      jQuery('.page-header').hide();
      jQuery('#desktop-nav li:nth-of-type(1)').addClass('active');
      jQuery('.welcome-hi').text('Hi ' + ef_current_user.name + '! Welcome to your Caregiver Training Portal')
    }
    if (window.location.href.indexOf("/start") > -1) {
      console.log("start");
      jQuery("body").addClass("page-courses");
      jQuery('.page-header-back a').text('' + backtitle).attr('href',backlink);
      jQuery('#desktop-nav li:nth-of-type(2)').addClass('active');
    }

    if (window.location.href.indexOf("cstart") > -1) {
      console.log("home");
      jQuery("body").addClass("page-course-overview");
      var backtitle = jQuery('.breadcrumb-x .visible-lg li a').eq(-2).text();
      var backlink = jQuery('.breadcrumb-x .visible-lg li a').eq(-2).attr('href');
      jQuery('.page-header-back a').text('< ' + backtitle).attr('href',backlink);
      jQuery('#desktop-nav li:nth-of-type(2)').addClass('active');
      var unitnumber = jQuery('.unit-entry').length;
      if (unitnumber < 2) {
        jQuery('.ef-course-progress-bar').hide();
      }
    }

    if (window.location.href.indexOf("content") > -1) {
      console.log("content");
      jQuery("body").addClass("page-course-play");
      jQuery('.page-header-back a').text('< Course Overview').attr('href',backlink);
      jQuery('.ef-center-section').removeClass('col-md-9').addClass('col-md-12');
      jQuery('.ef-side-section').hide();
      jQuery('#desktop-nav li:nth-of-type(2)').addClass('active');
      var unitnumber = jQuery('.unit-entry').length;
      if (unitnumber < 2) {
        jQuery('.progress').hide();
      }

      jQuery('.page-header-title').append('<span class="show-details">Show details</span>');

      jQuery('.show-details').click(function() {
        var thistext = jQuery(this).text();
        if (thistext == 'Show details') {
          jQuery('.ef-center-section').removeClass('col-md-12').addClass('col-md-9');
          jQuery('.ef-side-section').show();
          jQuery('.show-details').text('Fullwidth');        
        } else {
          jQuery('.ef-center-section').removeClass('col-md-9').addClass('col-md-12');
          jQuery('.ef-side-section').hide();
          jQuery('.show-details').text('Show details');             
        }
      });

      jQuery('.fullwidth').click(function() {
        jQuery('.ef-center-section').removeClass('col-md-9').addClass('col-md-12');
        jQuery('.ef-side-section').hide();
        jQuery('.fullwidth').removeClass('fullwidth').addClass('show-details').text('Show details');
      });
    }

    if (window.location.href.indexOf("achievements") > -1) {
      console.log("achievements");
      jQuery("body").addClass("page-achievements");
      jQuery('#desktop-nav li:nth-of-type(3)').addClass('active');
      var profilebaseurl = $('a.dropdown-item[href*="/users/edit/"]').attr('href');
      var certificatesurl = profilebaseurl + '/tab/certificates';
      var badgesurl = profilebaseurl + '/tab/badges';
      console.log(certificatesurl);
      console.log(badgesurl);

      $.get(badgesurl, function(data, status){
        var response = $('<html />').html(data);
        var badgessection = response.find('#custom_badge').parent().parent().html();
        jQuery('#ef-index-page').prepend(badgessection);
        jQuery('#ef-index-page').prepend(badgessection);
        jQuery('#ef-index-page').prepend(badgessection);
        jQuery('legend:eq(-2)').text('Specialist Badges');
        jQuery('.category-badges:eq(-2) div').hide();
        jQuery('legend:eq(-1)').text('Certificates');
        jQuery('.category-badges:eq(-1) div').hide();
        var hackbadge = '<div class="lp-badges"><img src="https://www.knowingmore.com/wp-content/uploads/2018/09/ITK-Dementia-Specialist-Badge.png"></div>';
        jQuery('.category-badges:eq(-2)').prepend(hackbadge);
      });

      $.get(certificatesurl, function(data, status){
        var response = $('<html />').html(data);
        var tablegrab = response.find('#certificatesTable').parent().parent().parent().html();
        jQuery('.category-badges:eq(-1)').after(tablegrab);
        var certificateshtml = '<tr class="defaultRowHeight  oddRowColor "><td class="ef-certificate-name">Feeding Your Clients<span class="label label-course">Course</span></td><td class="text-center">08/14/2018 16:21</td><td class="text-center ef-certificate-expiration-date">08/14/2020 16:21</td><td class="text-center ef-certificate-revoke-date">-</td><td class="text-center"><a class="fa fa-lg fa-eye fa-fw" href="https://learn.knowingmore.com/certificates/view/6" target="_new" title="Preview" alt="Preview"></a></td></tr>'
        jQuery('#certificatesTable .oddRowColor').hide();
        jQuery('#certificatesTable tbody').append(certificateshtml);
        jQuery('h1').parent().parent().hide();
      });

    }

    if (window.location.href.indexOf("support") > -1) {
      console.log("support");
      jQuery("body").addClass("page-support");
      jQuery('#desktop-nav li:nth-of-type(4)').addClass('active');
    }
    if (window.location.href.indexOf("messages") > -1) {
      console.log("messages");
      jQuery("body").addClass("page-messages");
      jQuery('#desktop-nav li:nth-of-type(5)').addClass('active');
    }
    if (window.location.href.indexOf("users") > -1) {
      console.log("users");
      jQuery("body").addClass("page-users");
    }
  }
});



