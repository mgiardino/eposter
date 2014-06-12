$(document).ready(function(){
	function nameFormatter(name,format){
		// Codici di formattazione nome
		// %s cognome completo
		// %S cognome abbreviato
		// %n nome completo
		// %N nome appuntato
		// %m secondo nome completo
		// %M secondo nome appuntato
		format=format.replace('%s',name.last_name);
		format=format.replace('%S',name.last_name.substring(0,1)+'.');
		format=format.replace('%n',name.first_name);
		format=format.replace('%N',name.first_name.substring(0,1)+'.');
		if(name.middle_name){
			format=format.replace('%m',name.middle_name);
			format=format.replace('%M',name.middle_name.substring(0,1)+'.');
		}else{
			format=format.replace('%m','');
			format=format.replace('%M','');
		}
		return format;
	}
	function abbrName(name,afflInd,afflId){
		var format="%s, %N %M ";
		var fMid
		if (name.middle_name ){fMid=" "+name.middle_name;}else{fMid='';}
		d=document.createElement("div");
		if(name.roles=="{1}"){$(d).addClass('presenting');}
		$(d).addClass('author');
		$(d).attr('authId',name.author_id);
		p=document.createElement("div");
		$(d).html(nameFormatter(name,format));
		var a=eval('['+name.affiliations.substring(1,name.affiliations.length-1)+']');
		for (var i=0;i<a.length;++i){
			var ind=afflId.indexOf(a[i]);
// 			console.log(temp);
			if(ind != -1){$(d).append("<sup>"+afflInd[ind]+"</sup>");}
		}
//  		console.log(a);

		if(name.contact_info){
			$(d).append('<a href="mailto:'+name.contact_info+'"><span class="ui-icon ui-icon-mail-closed"></span></a>');
		}
		// inserire mail
		$(d).append(p);
		$(p).addClass('authInfo');
		$(p).attr('authId',name.author_id);
		$(p).html('</p>prova</p>');
		$(p).dialog({autoOpen:false,title:name.first_name+fMid+' '+name.last_name});
		$(d).on('mouseover',function(e){$(".authclass[authId='"+$(this).attr('authId')+"']").dialog('open').dialog('option','position',[e.pageX+20.,e.pageY]);});
		$(d).on('mouseout',function(){$(".authclass[authId='"+$(this).attr('authId')+"']").dialog("close");});
		return d;
	}
	function tocCreate(toc){
		for(var i=0,len=toc.length;i<len;i++){
			$("#bar").append("<div class='tocVoice' bid="+toc[i].id+" level='"+toc[i].level+"' shname='"+toc[i].short_name+"'><span>"+toc[i].title+"</span></div>");
			//$("#info").html(toc[i].title);
			$(".tocVoice:last span").css('margin-left',10*toc[i].level);
		}
		$(".tocVoice").on("click",function(){
			var bid=$(this).attr('bid');
			var level=$(this).attr('level');
			if ($(this).attr('level')==0){var param='pid='+bid;}else{var param='bid='+bid;}
			$.ajax({async:false,url:'/tools/get_box.php',data:param,dataType:'json',success:function(dat){
// 				console.log(dat);
				$("#text").html("<h1>"+dat.response[0].title+"</h1>");
				if(level==0){
					$("#text").append("<div id='auth'></div>");
					$("#text").append("<div id='affl'></div>");
					$("#text").append("<div id='keyword'></div>");
					console.log(dat);
					dat.response[0].keys.forEach(function(item){
						$("#keyword").append("<span class='key'>"+item.keword_name+"</span>");
					});
					$("#text").append("<div id='abstract'></div>");
					$("#abstract").html(dat.response[0].abstract);
					var j=[];var k=[];
					for (i=0;i<dat.response[0].authorities.length;++i){
						$("#affl").append("<p><sup>"+(i+1)+"</sup>"+dat.response[0].authorities[i].short_name+"</p>");
						j.push(i+1);k.push(eval(dat.response[0].authorities[i].authority_id));
					}
					for (i=0;i<dat.response[0].authors.length;++i){
					$("#auth").append(abbrName(dat.response[0].authors[i],j,k));
					}
				}else{
					$("#text").append("<div class='tBody'>"+dat.response[0].content+"</div>");
				}
			}});
			activate(bid);
		});
	}
	function activate(num){
		if($(".active").length>0){$('.active').removeClass('active');}
		$(".tocVoice[bid='"+num+"']").addClass('active');
	}
	$.urlParam = function(name){
		var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
		if (results==null){return null;}else{return results[1] || 0;}
	}
	$.ajax({async:false,url:'/tools/get_toc.php',data:'bid=3',dataType:'json',success:function(toc){
		console.log(toc);
		tocCreate(toc.response);
	}});
	var bBid=decodeURIComponent($.urlParam('bid'));
	var bBname=decodeURIComponent($.urlParam('boxname'));
	var bCheck;
	if (bBid =='null'){
		if(bBname == 'null'){
			var text=window.location.pathname;
			var bName=text.split('/');
			if (bName.length >2){
				for (i=0,len=toc.length;i<len;i++){
					if (toc[i][2] == bName[3]){
						bCheck=toc[i][3];
					}
				}
			}else{
				bCheck=toc[0][3];
			}
		}else{
			for (i=0,len=toc.length;i<len;i++){
				if (toc[i][2] == bBname){bCheck=toc[i][3];}
			}
		}
	}else{
		bCheck=bBid;
	}
 	if (bCheck == 'null'){$('.tocVoice:first').click();}else{$(".tocVoice[bid='"+bCheck+"']").click();}
// 	$("#new").button();
});
