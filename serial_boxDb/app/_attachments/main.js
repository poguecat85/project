$('#home').live('pageshow', function () {
	console.log("I am working");
});

//mobile DOM loader ($) for #signup page mobile method
$('#signup').live('pageshow', function () {
	var rbform = $('#recordsignup');
	var	rberrorslink = $('#rberrorslink');
	var formSave = $('#submit');
	var d = new Date();
	var key = (d.getTime());
	
	// save form function
	formSave.on('click', function(){
		// form validation in jqm
		rbform.validate({
			invalidHandler: function(form, validator){
				rberrorslink.click();
				var html = '';
				for(var key in validator.submitted){
					var label = $('label[for^="' + key +'"]').not('[generated]');
					var legend = label.closest('fieldset').find('.ui-controlgroup-label');
					var fieldname = legend.length ? legend.text() : label.text();
					html += '<li>' + fieldname + '</li>';
				}
				$("#signuperrors ul").html(html);
			},
			submitHandler: function(){
				var data = rbform.serializeArray();
				storeData(data);
			} // ending function for submitHandler
		}); // ending function for rbform.validate
	}); // ending function for formSave
	var storeData = function (myData) {
		var _id = 'contact' + Math.floor(Math.random() * 1000000001);
		console.log(myData[0].value);
		var theObj = {};
		theObj._id = _id;
		theObj.flname = (myData[0].value);
		theObj.gender = (myData[1].value);
		theObj.addy = (myData[2].value);
		theObj.user = (myData[3].value);
		theObj.itemName = (myData[4].value);
		theObj.serialNum = (myData[5].value);
		theObj.group = (myData[6].value);
		
		$.couch.db('serial_box').saveDoc(theObj, {
			success : function(data){
				alert('The contact has been saved!');
				$.mobile.changePage($('#home'));
			}
		});
		
	}; // ending storeData function
}); // ending #signup page load

// mobile DOM loader ($) for #success page mobile method
$('#success').live('pageshow', function () {
	var clearLink = $('#clear');
	var displayLink = $('#display');
	// display data
	displayLink.on('click', function(){
		for (var i = 0; i < localStorage.length; i++) {
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var obj = JSON.parse(value);
			// $('#dataPlay').append(localStorage.getItem(localStorage.key(i)));
			console.log();	
		};
	});
}); //success page end 

$('#displayPage').live('pageshow', function () {
	$.couch.db("serial_box").view("app/data", {
		success: function (data) {
			$.each(data.rows, function(index, value) {
				var id= value.id;
				var item = (value.value || value.doc);
				console.log(id);
				$('#dataPlay').append(
					$('<li>').append(
						$('<a>').attr("href", "contact.html?contact=" + id)
						.text(item.flname)
					)
				);
			})
			$('#dataPlay').listview('refresh');
		}
	});
});

var urlVars = function () {
	var urlData = $($.mobile.activePage).data("url");
	var urlParts = urlData.split('?');
	// foo?a=1&b=2&c=3
	var urlPairs = urlParts[1].split('&');
	var urlValues = {};
	for (var pair in urlPairs) {
		var keyValue = urlPairs[pair].split('=');
		var key = decodeURIComponent(keyValue[0]);
		var value = decodeURIComponent(keyValue[1]);
		urlValues[key] = value;
	}
	return urlValues;	
};

$('#contactPage').live('pageshow', function () {
	var contact = urlVars()["contact"];
	$.couch.db("serial_box").openDoc(contact, {
		success: function (data) {
			var flname = data.flname;
			var group = data.group;
			var addy = data.addy;
			var user = data.user;
			var itemName = data.itemName;
			var serialNum = data.serialNum;
			$('<div class="individual">'+
       			'<h3>'+ flname +'</h3>'+
				'<ul class="inner">'+
					'<li>Email: '+ addy +'</li>'+
					'<li>Group: '+ group +'</li>'+
					'<li>Username: '+ user +'</li>'+
					'<li>Item Name: '+ itemName +'</li>'+
					'<li>Serial Number: '+ serialNum +'</li>'+
					'<li><a href="#" id="editLink">Edit Contact</a></li>' + 
		        	'<li><a href="#" id="deleteLink">Delete Contact</a></li>'+
		        '</ul>'+
		        '</div>' 
	        	  
	        	).appendTo('#dataslot');
	        	
	        $('#deleteLink').live('click', function(){
	        	var ask = confirm("Are you sure you want to delete this Contact?");
	        	if(ask) {
	        		$.couch.db("serial_box").removeDoc(data, {	
	        			success: function(data) {
	        				console.log(data);
	        				document.location.href = 'index.html#success';
	        				console.log(location);
	        			},
	        			error: function(status) {
	        				console.log(status);
	        			}
	        		});
	        	}else{ 
	        		alert("Sorry, contact not removed.");
	       			document.location.href = 'index.html#success';
	        	}
	        });
	        $('#dataslot').listview('refresh');
		}
	});
});



// mobile Dom loader ($) for #edit page mobile method
$('#editLink').live('click', function(){
	console.log("Pressed");
	var contact = urlVars()["contact"];
	$.mobile.changePage("index.html#signup");
	$.couch.db("serial_box").openDoc(contact, {
    	success: function(data) {
    		flname = data.flname;
    		group = data.group;
    		addy = data.addy;
    		user = data.user;
    		itemName = data.itemName;
    		serialNum = data.serialNum;
			$('#flname').val(flname);
		    $('#group').val(group);
		    $('#addy').val(addy);
		   // $('#groups').val(groups).selectmenu('refresh', true);
			$('#user').val(user);
		    $('#itemName').val(itemName);
		    $('#serialNum').val(serialNum);
        
			// show edit item button, hide submit button
			// var editButton = $('#editButton').css('display', 'block');
			
			// save changes
			$('#editItem').on('click', function(){
				var flname = $('#flname').val();
			    var group = $('#group').val();
			    var addy = $('#addy').val();
			    var user = $('#user').val();
				var itemName = $('#itemName').val();
			    var serialNum = $('#serialNum').val();
			    var item = {
					"_id": data._id,
					"_rev": data._rev,
					"flname": flname,
					"group": group,
					"addy": addy,
					"user": user,
					"itemName": itemName,
					"serialNum": serialNum		
					};
					console.log(item);

				$.couch.db("serial_box").saveDoc(item, {
					success: function(data) {
						console.log(data);
						alert("Contact was updated!");
						document.location.href = 'index.html#success';
					},
					error: function(status) {
        				console.log(status);
        				alert("Contact was not updated.");
    				}
				});
			return false;
			});
		}
	});
});

// JSON List
$('#jsondata').bind('click', function(){
	$('#data').empty();
	$('<p>').html('JSON Data Imported').appendTo('#data');
	$.ajax({
		url: 'xhr/data.json',
		type: 'GET',
		dataType: 'json',
		success: function(answer){
        	for (var i=0, j=answer.contacts.length; i<j; i++){
				var jdata = answer.contacts[i];
				$(''+
					'<div class="datainfo">'+
						'<p>Group: '+ jdata.group +'</p>'+
						'<p>First and Last Name: '+ jdata.flname +'</p>'+
						'<p>Email: '+ jdata.addy +'</p>'+
						'<p>Username: '+ jdata.user +'</p>'+
						'<p>Password: '+ jdata.pass +'</p>'+
						'<p>Confirm Password: '+ jdata.cnfrmpass +'</p>'+
						'<p>Item Name: '+ jdata.itemName +'</p>'+
						'<p>Serial Number: '+ jdata.serialNum +'</p>'+
					'</div>'
				).appendTo('#data');
				console.log(answer);
			}
		}
	});
	return false;
});

// XML List
$('#xmldata').on('click', function(){
	$('#data').empty();
	$('<p>').html('XML Data Imported').appendTo('#data');
	$.ajax({
		url: 'xhr/data.xml',
		type: 'GET',
		dataType: 'xml',
		success: function(xml){
			$(xml).find("contact").each(function(){
   				console.log($(xml).find("contact"));
   				var title = $(this).find('title').text();
   				var type = $(this).find('type').text();
   				var name = $(this).find('name').text();
   				var email = $(this).find('email').text();
   				var username = $(this).find('username').text();
   				var password = $(this).find('password').text();
    			$(''+
					'<div class="datainfo">'+
						'<p>'+ title +'</p>'+
						'<p>Type: '+ type +'</p>'+
						'<p>Name: '+ name +'</p>'+
						'<p>Email: '+ email +'</p>'+
						'<p>Username: '+ username +'</p>'+
						'<p>Password: '+ password +'</p>'+
					'</div>'
				).appendTo('#data');
				console.log(xml);
			});
		}
	});
	return false;
});


//CSV List
$('#csvdata').on('click', function(){
	$('#data').empty();
	$('<p>').html('CSV Data Imported').appendTo('#data');
	 $.ajax({
        type: "GET",
        url: "xhr/data.csv",
        dataType: "text",
        success: function(data) {
        	var allInfo = data.split(/\r\n|\n/);
    		var headers = allInfo[0].split(',');
    		var info = []; 

			for (var i=1; i<allInfo.length; i++) {
				var data = allInfo[i].split(',');
				if (data.length == headers.length) {
					var forminfo = []; 

					for (var j=0; j<headers.length; j++) {
						forminfo.push(data[j]); 
					}
					info.push(forminfo); 
				}

			}

			for (var m=0; m<info.length; m++){
				var acontact = info[m];
			$(''+
					'<div class="datainfo">'+
						'<h3>'+ acontact[0] +'</h3>'+
						'<p>Group:'+ acontact[1] +'</p>'+
						'<p>First and Last Name: '+ acontact[2] +'</p>'+
						'<p>Email: '+ acontact[3] +'</p>'+
						'<p>Username: '+ acontact[4] +'</p>'+
						'<p>Password: '+ acontact[5] +'</p>'+
						'<p>Confirm Password: '+ acontact[6] +'</p>'+
					'</div>'
				).appendTo('#data');
			console.log(info);	
			}
        }
	});
	return false;
});