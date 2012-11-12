/*
 * Copyright (C) 2012 DuckDuckGo, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


function Background()
{
    $this = this;
    chrome.extension.onMessage.addListener(function(request, sender, callback){
        console.log(request);
        if(request.query)
            $this.query(request.query, callback);
        if (request.options) {
            callback(localStorage);
        }

        if (request.selection) {
        
        }
    });

//  this.menuID = chrome.contextMenus.create({
//       "title" : "Ask the duck",
//       "type" : "normal",
//       "contexts" : ["selection"],
//       "onclick" : function() {
//          console.log('clicked!!!'); 
//       }
//  });
}

Background.prototype.query = function(query, callback) 
{
    var req = new XMLHttpRequest();
    if (localStorage['zeroclickinfo'] === 'true') {
        if(localStorage['meanings'] === 'true')
            req.open('GET', 'https://chrome.duckduckgo.com?q=' + encodeURIComponent(query) + '&format=json', true);
        else
            req.open('GET', 'https://chrome.duckduckgo.com?q=' + encodeURIComponent(query) + '&format=json&d=1', true);
    } else {
        callback(null);
        return;
    }

    req.onreadystatechange = function(data) {
        if (req.readyState != 4)  { return; } 
        var res = JSON.parse(req.responseText);
        callback(res);
    }

    req.send(null);
}

var background = new Background();
