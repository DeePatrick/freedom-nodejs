function Translate() {
    //initialization
    this.init = function (attribute, lng) {
        this.attribute = attribute;
        this.lng = lng;
    }
    //translate 
    this.process = function () {
        var self = this;
        var xrhFile = new XMLHttpRequest();
        //load content data 
        xrhFile.open("GET", "/resources/" + this.lng + ".json", false);
        xrhFile.onreadystatechange = function () {
            if (xrhFile.readyState === 4) {
                if (xrhFile.status === 200 || xrhFile.status == 0) {
                    var lngObject = JSON.parse(xrhFile.responseText);
                    console.log(lngObject.name1);
                    var allDom = document.getElementsByTagName("*");
                    for (var i = 0; i < allDom.length; i++) {
                        var elem = allDom[i];
                        var key = elem.getAttribute(self.attribute);

                        if (key != null) {
                            console.log(key);
                            elem.innerHTML = lngObject[key];
                        }
                    }

                }
            }
        }
        xrhFile.send();
    }

}

