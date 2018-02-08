//WORKING
function getLocation(){
    //may not work when we put it up.
    navigator.geolocation.watchPosition(createNode);
}

function nodeDistance(node1, node2){
    //Assign lat & long to variables for cleaner format
    var x1 = node1.lat;
    var x2 = node2.lat;
    var y1 = node1.lng;
    var y2 = node2.lng;

    //convert distance between axis into radians
    var dLat = (x2-x1) * Math.PI / 180;
    var dLon = (y2-y1) * Math.PI / 180;

    //conver lat into radians
    var lat1 = x1 * Math.PI / 180;
    var lat2 = x2 * Math.PI / 180;

    //Haversine forumla and convert into miles
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var dist = 3958 * c / 10;
    
    return dist;
}

function findNearestNode(node){
    var nearestNode;
    var nearest = 1;
    for(key in tests){
        var dist = nodeDistance(node, tests[key]);
        //console.log(tests[key]);
        if (dist < nearest){
            
            nearestNode = tests[key];
            nearest = dist;
            
        }
    }
    return nearestNode;
}

function findNearestBigNode(node){
    var nearestBigNode;
    var nearest = 1;
    for(key in nodes){
        if (nodes[key].areas != undefined){
            var dist = nodeDistance(node, nodes[key]);
            //console.log(dist);
            //console.log(nodes[key]);
        }
        if (dist < nearest){
            nearest = dist;
            nearestBigNode = nodes[key];
        }
        //console.log(nearestBigNode);
    }
    return nearestBigNode;
}
var locationNode;
function createNode(pos){
    var x = document.getElementById("testLocation");
    
    locationNode = {
        "id":"0000000",
        "name":"My Location",
        "areas":null,
        "lat":null,
        "lng":null,
        "type":null,
        "to":[]
    };
    x.innerHTML = "Latitude: " + pos.coords.latitude.toFixed(6) +
		"<br>Longitude: " + pos.coords.longitude.toFixed(6);
    locationNode.lat = pos.coords.latitude.toFixed(6);
    locationNode.lng = pos.coords.longitude.toFixed(6);
    
    var nearestBigNode = findNearestBigNode(locationNode);
    locationNode.areas = nearestBigNode.areas;
    
    nodes[locationNode.id] = locationNode;
    
    var nearestNode = findNearestNode(locationNode);
    locationNode.to.push(nearestNode.id);
    
    tests[locationNode.id] = locationNode;
}