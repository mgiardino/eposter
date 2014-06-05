$(document).ready(function(){
	var toc=[['General',0,'general',1],['Prova',1,'prova',2],['prova1',2,'prova1',3],['prova2',1,'prova2',4]];
	var txt="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum";
	function tocCreate(toc){
		for(var i=0,len=toc.length;i<len;i++){
			$("#bar").append("<div class='tocVoice' bid="+toc[i].bid+" shname='"+toc[i].short_name+"'><span>"+toc[i].title+"</span></div>");
			//$("#info").html(toc[i].title);
			$(".tocVoice:last span").css('margin-left',10*toc[i].level);
		}
		$(".tocVoice").on("click",function(){
			var bid=$(this).attr('bid');
			var param='bid='+bid;
			$.ajax({async:false,url:'/tools/get_box.php',data:param,dataType:'json',success:function(dat){
				console.log(dat);
				$("#text").html("<h1>"+dat.response[0].title+"</h1>");
				$("#text").append("<div class='tBody'>"+dat.response[0].content+"</div>")
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
 	$("#new").button();
});