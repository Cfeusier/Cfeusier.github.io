---
layout: post_image
title:  "Design is not just what it looks like"
date:   2014-04-23 01:30:52
image_file : "blog/01.jpg"
excerpt: "This is a custom excerpt. The others are auto generated from the first paragraph of post but this one has been entered manually. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."

tags:
- jekyll
- fashion
---

Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.


            /*Basic Setups
            ------------------------------------------------*/
            this.sections = this.wrapper.children('section');
            this.currentPage = this.sections.filter('.active');
            this.config.navHeight = this.navContainer.height();
            this.currentPage.css('z-index', 101).show();

            this.prepare();
            this.bindUiAction();

            this.demandPage = this.currentPage;
            this.demandPage.find('.contain').css('padding-top',this.config.navHeight);
            this.toTop = true;
            showScroll(this);
            this.toTop = false;
            initHome(this);

            /*Navigation Events Handlers
            ----------------------------------------------*/
            var self = this,navT,nav,anim,obj;
            this.navLi.on('mouseover', function() {
                obj=(self.toTop)?{top:'-16px'}:{top:'0px'};
                var topText=$(this).find('span.top'),
                    bottomText=$(this).find('span.bottom');
                anim = new TimelineLite({});
                anim
                .to(topText,0.4,obj)
                .to(bottomText,0.4,obj,'-=0.4');
            });
            this.navLi.on('mouseleave', function() {
                obj=(self.toTop)?{top:'0px'}:{top:'-16px'};
                var topText=$(this).find('span.top'),
                    bottomText=$(this).find('span.bottom');
               anim = new TimelineLite({});
                anim
                .to(topText,0.4,obj)
                .to(bottomText,0.4,obj,'-=0.4');
            });
            this.navLi.on('click', function() {
                pages.navigate($(this).attr('data-page'));
            });
        }
    }


Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.