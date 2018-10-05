/**
 * main.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2016, Codrops
 * http://www.codrops.com
 */



;(function(window) {

    'use strict';

    // helper functions
    // from https://davidwalsh.name/vendor-prefix
    var prefix = (function () {
        var styles = window.getComputedStyle(document.documentElement, ''),
            pre = (Array.prototype.slice.call(styles).join('').match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o']))[1],
            dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];

        return {
            dom: dom,
            lowercase: pre,
            css: '-' + pre + '-',
            js: pre[0].toUpperCase() + pre.substr(1)
        };
    })();

    // vars & stuff
    var support = {transitions : Modernizr.csstransitions},
        transEndEventNames = {'WebkitTransition': 'webkitTransitionEnd', 'MozTransition': 'transitionend', 'OTransition': 'oTransitionEnd', 'msTransition': 'MSTransitionEnd', 'transition': 'transitionend'},
        transEndEventName = transEndEventNames[Modernizr.prefixed('transition')],
        onEndTransition = function(el, callback, propTest) {
            var onEndCallbackFn = function( ev ) {
                if( support.transitions ) {
                    if( ev.target != this || propTest && ev.propertyName !== propTest && ev.propertyName !== prefix.css + propTest ) return;
                    this.removeEventListener( transEndEventName, onEndCallbackFn );
                }
                if( callback && typeof callback === 'function' ) { callback.call(this); }
            };
            if( support.transitions ) {
                el.addEventListener( transEndEventName, onEndCallbackFn );
            }
            else {
                onEndCallbackFn();
            }
        },
        // the mall element
        mall = document.querySelector('.mall'),
        // mall´s levels wrapper
        mallLevelsEl = mall.querySelector('.levels'),
        // mall´s levels
        mallLevels = [].slice.call(mallLevelsEl.querySelectorAll('.level')),
        // total levels
        mallLevelsTotal = mallLevels.length,
        // surroundings elems
        mallSurroundings = [].slice.call(mall.querySelectorAll('.surroundings')),
        // selected level position
        selectedLevel,
        // navigation element wrapper
        mallNav = document.querySelector('.mallnav'),
        // show all mall´s levels ctrl
        allLevelsCtrl = mallNav.querySelector('.mallnav__button--all-levels'),
        // levels navigation up/down ctrls
        levelUpCtrl = mallNav.querySelector('.mallnav__button--up'),
        levelDownCtrl = mallNav.querySelector('.mallnav__button--down'),
        // pins
        pins = [].slice.call(mallLevelsEl.querySelectorAll('.pin')),
        // content element
        contentEl = document.querySelector('.content'),
        // content close ctrl
        contentCloseCtrl = contentEl.querySelector('button.content__button'),
        // check if a content item is opened
        isOpenContentArea,
        // check if currently animating/navigating
        isNavigating,
        // check if all levels are shown or if one level is shown (expanded)
        isExpanded,
        // spaces list element
        spacesListEl = document.getElementById('spaces-list'),
        // spaces list ul
        spacesEl = spacesListEl.querySelector('ul.list'),
        // all the spaces listed
        spaces = [].slice.call(spacesEl.querySelectorAll('.list__item > a.list__link')),
        // reference to the current shows space (name set in the data-name attr of both the listed spaces and the pins on the map)
        spaceref,

        // listjs initiliazation (all mall´s spaces)
        spacesList = new List('spaces-list', { valueNames: ['list__link', { data: ['level'] }, { data: ['category'] } ]} ),

        // smaller screens:
        // open search ctrl
        openSearchCtrl = document.querySelector('button.open-search'),
        // main container
        containerEl = document.querySelector('.container'),
        // close search ctrl
        closeSearchCtrl = spacesListEl.querySelector('button.close-search');

    function init() {
        // init/bind events
        initEvents();
    }
    var moved_once = 0;
    var closeSens = $(".close_button");

    /**
     * Initialize/Bind events fn.
     */

    function initEvents() {
        // click on a Mall´s level
        mallLevels.forEach(function(level, pos) {
            level.addEventListener('click', function() {
                // shows this level
                showLevel(pos+1);

            });
        });

        // click on the show mall´s levels ctrl
        allLevelsCtrl.addEventListener('click', function() {

            //hides all pins
            pins.forEach(function(pin) {
                pin.style.display = "none";
            });

            // shows all levels
            showAllLevels();
        });

        var allStates = $("#search-button");
        allStates.on("click", function() {
            openSensorArea();
            window.dispatchEvent(new Event('resize'));
        });

        var qual_pres = $("#qual_temp-button");
        qual_pres.on("click", function() {
            openSensorQPArea();
            window.dispatchEvent(new Event('resize'));
        });



        closeSens.on("click", function() {
            closeSensorArea();
            window.dispatchEvent(new Event('resize'));
        });

        var storicoTemp = $("#temp_storico_button");
        storicoTemp.on("click", function() {
            OpenTempStoricoArea();
            window.dispatchEvent(new Event('resize'));
        });


        var storicoHum = $("#hum_storico_button");
        storicoHum.on("click", function() {
            OpenHumStoricoArea();
            window.dispatchEvent(new Event('resize'));
        });

        var backTemp = $(".back_tempHum_button");
        backTemp.on("click", function() {
            BackToTempHum();
            window.dispatchEvent(new Event('resize'));
        });

        var storicoPres = $("#pres_storico_button");
        storicoPres.on("click", function() {
            OpenPresStoricoArea();
            window.dispatchEvent(new Event('resize'));
        });

        var backTemp = $(".back_qualPres_button");
        backTemp.on("click", function() {
            BackToQualPres();
            window.dispatchEvent(new Event('resize'));
        });

        var storicoQual = $("#qual_storico_button");
        storicoQual.on("click", function() {
            OpenQualStoricoArea();

        });


        // navigating through the levels
        levelUpCtrl.addEventListener('click', function() { navigate('Down'); });
        levelDownCtrl.addEventListener('click', function() { navigate('Up'); });


        // hovering a pin / clicking a pin
        pins.forEach(function(pin) {
            var contentItem = contentEl.querySelector('.content__item[data-space="' + pin.getAttribute('data-space') + '"]');


            pin.addEventListener('mouseenter', function() {
                if( !isOpenContentArea ) {
                    classie.add(contentItem, 'content__item--hover');
                }
            });
            pin.addEventListener('mouseleave', function() {
                if( !isOpenContentArea ) {
                    classie.remove(contentItem, 'content__item--hover');
                }
            });
            pin.addEventListener('click', function(ev) {
                ev.preventDefault();
                // open content for this pin
                openContent(pin.getAttribute('data-space'));
                // remove hover class (showing the title)
                classie.remove(contentItem, 'content__item--hover');
            });
        });

        // closing the content area
        contentCloseCtrl.addEventListener('click', function() {

            //hides all pins
            pins.forEach(function(pin) {
                pin.style.display = "none";
            });

            closeContentArea();
        });



        // clicking on a listed space: open level - shows space
        spaces.forEach(function(space) {
            var spaceItem = space.parentNode,
                level = spaceItem.getAttribute('data-level'),
                spacerefval = spaceItem.getAttribute('data-space');

            space.addEventListener('click', function(ev) {
                ev.preventDefault();
                // for smaller screens: close search bar
                closeSearch();

                // open level
                if (level != selectedLevel){
                    showLevel(parseInt(level) +1);
                }

                // open content for this space



                //set the current level pins as active
                var levelEl = mallLevels[level];
                classie.add(levelEl.querySelector('.level__pins'), 'level__pins--active');

                //hides all pins
                pins.forEach(function(pin) {
                    pin.style.display = "none";
                });

                //display the selected pin
                document.getElementById("DS"+spacerefval).style.display = "block";
                openContent(spacerefval);

                /*if(moved_once == 0) {
                    var style = document.createElement('style');
                    style.type = 'text/css';
                    //style.innerHTML = ".levels { transition: 0.5s; margin: -10vmin 0 0 -48vmin; }";
                    document.getElementsByTagName('head')[0].appendChild(style);
                    moved_once++;
                }*/

                if($('.search__input')[0].value !== "") {
                    spacesList.filter();
                    getListElement();
                }

                // open level
                //showLevel(level);
            });




        });

        // smaller screens: open the search bar
        openSearchCtrl.addEventListener('click', function() {
            openSearch();
        });

        // smaller screens: close the search bar
        closeSearchCtrl.addEventListener('click', function() {
            closeSearch();
        });

        var prevCategory = 0;
        $(".search").bind('keyup', function (e) {
            spacesList.filter();
            if(""+ document.getElementsByClassName('search__input')[0].value == "") {
                //if(selectedLevel !== undefined) showLevelSpaces();
                Show('1');
                Show('2');
                Show('3');
                Show('4');
                Show('5');
                if(firstOpen == 1) { Show('1');}
                else if(secondOpen == 1) { Show('2');}
                else if(thirdOpen == 1) { Show('3');}
                else if(fourthOpen == 1) { Show('4');}
                else if(fifthOpen == 1) { Show('5');}

               showLevelSpaces();
            } else {
                $( "ul.list li" ).each(function( index ) {
                    var category = $(this).attr('data-category');
                    if (category !== prevCategory) {
                        var content = getComputedStyle(this, ':before').getPropertyValue('content').replace(' ▾','');
                        $(this).before("<li id='"+category+"' data-content="+content+" class='list__item title'" +
                            "data-level='0' data-category='"+category+"'></li>");
                    }
                    prevCategory = $(this).attr('data-category');
                    $(this).children().fadeIn();
                });
            }
            prevCategory = 0;

        });

    }

    /**
     * Opens a level. The current level moves to the center while the other ones move away.
     */
    var i = 0;

    function pinClick (e) {

        //set the current level pins as active
        var levelEl = mallLevels[selectedLevel ];
        classie.add(levelEl.querySelector('.level__pins'), 'level__pins--active');
        //hides all pins
        pins.forEach(function(pin) {
            pin.style.display = "none";
        });

        //display the selected pin
        document.getElementById("DS"+$(this).attr("data-space")).style.display = "block";
        openContent($(this).attr("data-space"));



    }

    function showLevel(level) {
       /* $( ".showInMap" ).each(function( index ) {
            $(this).hide();
        });*/
        $( ".hideInMap" ).each(function( index ) {
            $(this).fadeIn();
        });
        //closeSens.click();
        changelev(level);
        if (i==0) {
            $('.clickable_space').on("click", pinClick);
            i++;
        }

        if( level == selectedLevel) {
            return false;
        }

        var oldLevel = selectedLevel;
        // update selected level val
        selectedLevel = level-1;

        // control navigation controls state
        setNavigationState();

        if (oldLevel !== undefined && oldLevel !== 0){
            classie.remove(mallLevelsEl, 'levels--selected-' + oldLevel);
            classie.remove(mallLevels[oldLevel], 'level--current');
        }
console.log(selectedLevel+ ' lev2');
        classie.add(mallLevelsEl, 'levels--selected-' + selectedLevel);

        // the level element
        var levelEl = mallLevels[selectedLevel ];
        classie.add(levelEl, 'level--current');

        onEndTransition(levelEl, function() {
            classie.add(mallLevelsEl, 'levels--open');

            for(var i = 0; i<mallLevelsTotal;i++) {
                if(selectedLevel != i ) classie.add(mallLevels[i], 'level--hideMe');
                else classie.remove(mallLevels[i], 'level--hideMe');

            }


            // show level pins
            //showPins();

            isExpanded = true;
        }, 'transform');

        // hide surroundings element
        hideSurroundings();

        // show mall nav ctrls
        showMallNav();



        // filter the spaces for this level
		if($('.search__input').val() === '') {
            showLevelSpaces();
		}

        var list= document.getElementsByClassName("changeCol");
        setTimeout(function () {
            for (var i = 0; i < list.length; i++) {
                list[i].style.fill= list[i].id;
            }
        }, 500);

        $(".level--0").attr('data-content','');
        $(".level--1").attr('data-content','');
        $(".level--2").attr('data-content','');
        $(".level--3").attr('data-content','');
        var lev_val = level + 1;
		var piano_val= lev_val - 2;

		if (lev_val == 1){
            $(".level--" + level).attr('data-content','Livello '+lev_val + ' - Piano Interrato');
        }else if (lev_val == 2){
            $(".level--" + level).attr('data-content','Livello '+lev_val + ' - Piano Terra');
        } else {
            $(".level--" + level).attr('data-content', 'Livello ' + lev_val + ' - Piano ' + piano_val);
        }


        classie.add(document.getElementsByClassName('boxbutton--dark mallnav__button--all-levels')[0], 'button--hidden');
        classie.add(document.getElementsByClassName('mallnav__button--up')[0], 'button--hidden');
        classie.add(document.getElementsByClassName('mallnav__button--down')[0], 'button--hidden');


        setTimeout(function () {
            $(".level--0").attr('data-content','Livello 1 - Piano Interrato');
            $(".level--1").attr('data-content','Livello 2 - Piano Terra');
            $(".level--2").attr('data-content','Livello 3 - Piano 1');
            $(".level--3").attr('data-content','Livello 4 - Piano 2');
            classie.remove(document.getElementsByClassName('boxbutton--dark mallnav__button--all-levels')[0], 'button--hidden');
            classie.remove(document.getElementsByClassName('mallnav__button--up')[0], 'button--hidden');
            classie.remove(document.getElementsByClassName('mallnav__button--down')[0], 'button--hidden');
        }, 1000);

    }

    /**
     * Shows all Mall´s levels
     */
    function showAllLevels() {
        $('#levelName').html('');
        if($('.search__input')[0].value !== "") {
            getListElement();

            $( "ul.list li" ).each(function( index ) {
                Show('1');
                Show('2');
                Show('3');
                Show('4');
                Show('5');
            });

        } else {
            spacesList.filter();
        }
        moved_once = 0;
        $( ".hideInMap" ).each(function( index ) {
            $(this).hide();
        });
        $( ".showInMap" ).each(function( index ) {
            $(this).fadeIn();
        });

        $('.clickable_space').off('click');
        i = 0;
        if( isNavigating || !isExpanded ) {
            return false;
        }
        isExpanded = false;

        for(var j = 0; j<mallLevelsTotal;j++) {

            if(selectedLevel != j + 1) classie.remove(mallLevels[j], 'level--hideMe');

        }


        classie.remove(mallLevels[selectedLevel ], 'level--current');
        classie.remove(mallLevelsEl, 'levels--selected-' + selectedLevel);
        classie.remove(mallLevelsEl, 'levels--open');

        // hide level pins
        removePins();

        // shows surrounding element
        showSurroundings();

        // hide mall nav ctrls
        hideMallNav();

        // show back the complete list of spaces
        //spacesList.filter();

        // close content area if it is open
        if( isOpenContentArea ) {
            closeContentArea();
        }

        changelev(0);
        selectedLevel = 0;
    }

    /**
     * Shows all spaces for current level
     */
    function showLevelSpaces() {
        switch (selectedLevel) {
            case 0:
                $('#levelName').html('Livello 1 - Piano Interrato');
                break;
            case 1:
                $('#levelName').html('Livello 2 - Piano Terra');
                break;
            case 2:
                $('#levelName').html('Livello 3 - Piano 1');
                break;
            case 3:
                $('#levelName').html('Livello 4 - Piano 2');
                break;
            default:
                $('#levelName').html('');
        }
        if (selectedLevel !== undefined ){
            selectedLevel === 0 ? lev = -1 : lev = selectedLevel;

            spacesList.filter(function(item) {
                return item.values().level === lev.toString();
            });


            $(".list__item[data-level='"+lev.toString()+"']").each(function () {
                $(this).show();
            });
        }
    }

    function howManySpaces() {
        var cat1 = 0;
        spacesList.filter(function(item) {

            if(item.values().level === selectedLevel.toString()) {
                if(item.values().category == "1");
                cat1++;
            }

        });

    }

    /**
     * Shows the level´s pins
     */
    function showPins(levelEl) {
        var levelEl = levelEl || mallLevels[selectedLevel - 1];
        classie.add(levelEl.querySelector('.level__pins'), 'level__pins--active');
    }

    /**
     * Removes the level´s pins
     */
    function removePins(levelEl) {
       $('#level__pins_'+levelEl).removeClass('level__pins--active');
    }

    /**
     * Show the navigation ctrls
     */
    function showMallNav() {
        classie.remove(mallNav, 'mallnav--hidden');
    }

    /**
     * Hide the navigation ctrls
     */
    function hideMallNav() {
        classie.add(mallNav, 'mallnav--hidden');
    }

    /**
     * Show the surroundings level
     */
    function showSurroundings() {
        mallSurroundings.forEach(function(el) {
            classie.remove(el, 'surroundings--hidden');
        });
    }

    /**
     * Hide the surroundings level
     */
    function hideSurroundings() {
        mallSurroundings.forEach(function(el) {
            classie.add(el, 'surroundings--hidden');
        });
    }

    /**
     * Navigate through the mall´s levels
     */
    function navigate(direction) {
        if (isOpenContentArea) {
            closeContentArea();
            isOpenContentArea = false;
        }
        if( isNavigating || !isExpanded || isOpenContentArea ) {
            return false;
        }
        isNavigating = true;

        removePins(selectedLevel);

        var prevSelectedLevel = selectedLevel;

        // current level
        var currentLevel = mallLevels[prevSelectedLevel];

        if( direction === 'Up' && prevSelectedLevel > 0 ) {
            --selectedLevel;
        }
        else if( direction === 'Down' && prevSelectedLevel < mallLevelsTotal ) {
            ++selectedLevel;
        }
        else {
            isNavigating = false;
            return false;
        }

        // control navigation controls state (enabled/disabled)
        setNavigationState();
        // transition direction class
        classie.add(currentLevel, 'level--moveOut' + direction);
        // next level element
        var nextLevel = mallLevels[selectedLevel];

        classie.remove(nextLevel, 'level--hideMe');

        // ..becomes the current one
        classie.add(nextLevel, 'level--current');

        // when the transition ends..
        onEndTransition(currentLevel, function() {
            classie.remove(currentLevel, 'level--moveOut' + direction);
            // solves rendering bug for the SVG opacity-fill property
            setTimeout(function() {classie.remove(currentLevel, 'level--current');}, 60);

            classie.remove(mallLevelsEl, 'levels--selected-' + prevSelectedLevel);
            classie.add(mallLevelsEl, 'levels--selected-' + selectedLevel);

            // show the current level´s pins
            //showPins();

            isNavigating = false;


        });

        // filter the spaces for this level
        if (document.getElementsByClassName('search__input')[0].value == "") {
            showLevelSpaces();
        } else {
            $( "ul.list li" ).each(function( index ) {
                var category = $(this).attr('data-category');
                if (category !== prevCategory) {
                    var content = getComputedStyle(this, ':before').getPropertyValue('content').replace(' ▾','');
                    $(this).before("<li id='"+category+"' data-content="+content+" class='list__item title'" +
                        "data-level='0' data-category='"+category+"'></li>");
                }
                prevCategory = $(this).attr('data-category');
                $(this).children().fadeIn();
            });
        }
        prevCategory = 0;

        // hide the previous level´s pins

        //removePins(currentLevel);
        switch_lev(selectedLevel);

    }

    /**
     * Control navigation ctrls state. Add disable class to the respective ctrl when the current level is either the first or the last.
     */
    function setNavigationState() {
        if( selectedLevel == 0 ) {
            classie.add(levelDownCtrl, 'boxbutton--disabled');
        }
        else {
            classie.remove(levelDownCtrl, 'boxbutton--disabled');
        }

        if( selectedLevel == mallLevelsTotal-1 ) {
            classie.add(levelUpCtrl, 'boxbutton--disabled');
        }
        else {
            classie.remove(levelUpCtrl, 'boxbutton--disabled');
        }
    }

    /**
     * Opens/Reveals a content item.
     */
    function openContent(spacerefval) {
        classie.add(document.getElementsByClassName("box")[0], 'legend_moved');

        // if one already shown:
        if( isOpenContentArea ) {
            hideSpace();
            spaceref = spacerefval;
            showSpace();
        }
        else {
            spaceref = spacerefval;
            openContentArea();
        }

        // remove class active (if any) from current list item
        var activeItem = spacesEl.querySelector('li.list__item--active');
        if( activeItem ) {
            classie.remove(activeItem, 'list__item--active');
        }
        // list item gets class active

        classie.add(spacesEl.querySelector('li[data-space="' + spacerefval + '"]'), 'list__item--active');

        // remove class selected (if any) from current space
        var activeSpaceArea = mallLevels[selectedLevel - 1].querySelector('svg > .map__space--selected');
        if( activeSpaceArea ) {
            classie.remove(activeSpaceArea, 'map__space--selected');
        }
        // svg area gets selected
        //classie.add(mallLevels[selectedLevel - 1].querySelector('svg > .map__space[data-space="' + spaceref + '"]'), 'map__space--selected');

    }

    function openSensorArea() {

        // shows space
        showSensorSpace(true);
        // resize mall area
        classie.add(mall, 'mall--content-open');


    }

    function openSensorQPArea() {

        var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = ".levels { transition: 0.5s; margin: -16vmin 0 0 -48vmin;height:50%;}";
        document.getElementsByTagName('head')[0].appendChild(style);

        document.getElementById('qual_pres_Div').style.display = "block";


        // resize mall area
        classie.add(mall, 'mall--content-open');


    }


    function OpenTempStoricoArea() {
        document.getElementById('welcomeDiv').style.display = "none";

        document.getElementById('welcomeDiv2').style.display = "block";

    }
    function BackToTempHum() {
        document.getElementById('welcomeDiv').style.display = "block";
        document.getElementById('welcomeDiv2').style.display = "none";
        document.getElementById('hum_storico_Div').style.display = "none";

    }
    function OpenHumStoricoArea() {
        document.getElementById('welcomeDiv').style.display = "none";
        document.getElementById('hum_storico_Div').style.display = "block";

    }

    function OpenPresStoricoArea() {
        document.getElementById('qual_pres_Div').style.display = "none";
        document.getElementById('pres_storico_Div').style.display = "block";

    }
    function OpenQualStoricoArea() {
        document.getElementById('qual_pres_Div').style.display = "none";
        document.getElementById('qual_storico_Div').style.display = "block";

    }
    function BackToQualPres() {
        document.getElementById('qual_pres_Div').style.display = "block";
        document.getElementById('pres_storico_Div').style.display = "none";
        document.getElementById('qual_storico_Div').style.display = "none";
    }

    function closeSensorArea() {

        // shows space
        closeSensorSpace(true);
        // resize mall area
        classie.remove(mall, 'mall--content-open');


    }

    /**
     * Shows a space.
     */
    function showSensorSpace(sliding) {


        var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = ".levels { transition: 0.5s; margin: -16vmin 0 0 -48vmin;height:50%;}";
        document.getElementsByTagName('head')[0].appendChild(style);

        document.getElementById('welcomeDiv').style.display = "block";


    }

    function closeSensorSpace(sliding) {
        var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = ".levels {transition: 0.5s; margin: -32vmin 0 0 -48vmin; height:74vmin;}";
        document.getElementsByTagName('head')[0].appendChild(style);


        document.getElementById('welcomeDiv').style.display = "none";
        document.getElementById('welcomeDiv2').style.display = "none";
        document.getElementById('qual_pres_Div').style.display = "none";
        document.getElementById('hum_storico_Div').style.display = "none";
        document.getElementById('pres_storico_Div').style.display = "none";
        document.getElementById('qual_storico_Div').style.display = "none";

    }

    /**
     * Opens the content area.
     */
    function openContentArea() {
        isOpenContentArea = true;
        // shows space
        showSpace(true);

        // show close ctrl
        classie.remove(contentCloseCtrl, 'content__button--hidden');
        // resize mall area
        classie.add(mall, 'mall--content-open');

        setNavigationState();

    }

    /**
     * Shows a space.
     */


    function showSpace(sliding) {
        // the content item
        var contentItem = contentEl.querySelector('.content__item[data-space="' + spaceref + '"]');


        selectedRealtime = contentItem.getAttribute('data-realtime');






        // show content
        classie.add(contentItem, 'content__item--current');
        if( sliding ) {
            onEndTransition(contentItem, function() {
                classie.add(contentEl, 'content--open');
            });
        }
        // map pin gets selected
        try {
            classie.add(mallLevelsEl.querySelector('.pin[data-space="' + spaceref + '"]'), 'pin--active');
        }
        catch(err) {

        }






        var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = ".levels { transition: 0.5s; margin: -16vmin 0 0 -48vmin;}";
        document.getElementsByTagName('head')[0].appendChild(style);




    }

    /**
     * Closes the content area.
     */
    function closeContentArea() {
        classie.remove(contentEl, 'content--open');
        // close current space
        hideSpace();
        // hide close ctrl
        classie.add(contentCloseCtrl, 'content__button--hidden');
        // resize mall area
        classie.remove(mall, 'mall--content-open');
        // enable mall nav ctrls
        if( isExpanded ) {
            setNavigationState();
        }
        isOpenContentArea = false;
        classie.remove(document.getElementsByClassName("box")[0], 'legend_moved');
    }

    /**
     * Hides a space.
     */
    function hideSpace() {
        // the content item
        var contentItem = contentEl.querySelector('.content__item[data-space="' + spaceref + '"]');
        // hide content
        classie.remove(contentItem, 'content__item--current');
        // map pin gets unselected

        try {
            classie.remove(mallLevelsEl.querySelector('.pin[data-space="' + spaceref + '"]'), 'pin--active');
        }
        catch(err) {

        }
        // remove class active (if any) from current list item
        var activeItem = spacesEl.querySelector('li.list__item--active');
        if( activeItem ) {
            classie.remove(activeItem, 'list__item--active');
        }
        // remove class selected (if any) from current space
        var activeSpaceArea = mallLevels[selectedLevel - 1].querySelector('svg > .map__space--selected');
        if( activeSpaceArea ) {
            classie.remove(activeSpaceArea, 'map__space--selected');
        }
        var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = ".levels { transition: 0.5s; margin: -32vmin 0 0 -48vmin; }";
        document.getElementsByTagName('head')[0].appendChild(style);
    }

    /**
     * for smaller screens: open search bar
     */
    function openSearch() {
        // shows all levels - we want to show all the spaces for smaller screens
        showAllLevels();
        classie.add(spacesListEl, 'spaces-list--open');
        classie.add(containerEl, 'container--overflow');
    }

    /**
     * for smaller screens: close search bar
     */
    function closeSearch() {
        classie.remove(spacesListEl, 'spaces-list--open');
        classie.remove(containerEl, 'container--overflow');
    }

    init();

    function getListElement() {
        var prevCategory = 0;
        $( "ul.list li" ).each(function( index ) {
            var category = $(this).attr('data-category');
            if (category !== prevCategory) {
                var content = getComputedStyle(this, ':before').getPropertyValue('content').replace(' ▾','');
                $(this).before("<li id='"+category+"' data-content="+content+" class='list__item title'" +
                    "data-level='0' data-category='"+category+"'></li>");
            }
            prevCategory = $(this).attr('data-category');
            $(this).children().fadeIn();
        });
    }

})(window);