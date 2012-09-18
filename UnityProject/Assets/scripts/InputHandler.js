var moving_cat:Cat=null;
var hasTouched = false;
var mCamera:Camera;
var lastPos:Vector2 = Vector2.zero;
var v:float;
	var t1:float = 0;
	var count = 0;
	var t2:float;
//var st:float = 0;
function Start(){
mCamera = Camera.main;
	//StartCoroutine("threadHandleInput");
	
}
function Update () {
	//Debug.Log("input handler update");
	if (CentralController.status == 0)
			handleTouch2();
//	count +=1;
//		t1 += Time.deltaTime;
//		if (t1 > 2){
//			v = count/2;
//			count =0;
//			t1=0;
//		}
}
//function OnGUI(){
//	GUI.Label (Rect (0,0,Screen.width,Screen.height), "handle speed:"+v);
//}
function OnPreCull(){
//Debug.Log("onPreCull");
	if (CentralController.status == 0)
	handleTouch2();
//		count +=1;
//		t1 += Time.time-t2;
//		t2 = Time.time;
//		if (t1 > 2){
//			v = count/2.0f;
//			count =0;
//			t1=0;
//		}
}
function OnPreRender(){
//Debug.Log("OnPreRender");
}
function threadHandleInput(){
	
	while (true){
		//st += Time.deltaTime;
		//Debug.Log("time ="+st);
		//if (st>0.1f){
		
		//	Debug.Log("===>handle input");
			
			handleTouch2();
			
			//st = 0;
	//	}
		count +=1;
		t1 += Time.time-t2;
		t2 = Time.time;
		if (t1 > 2){
			v = count/2;
			count =0;
			t1=0;
		}
		yield;
	}
}

function handleTouch2(){
	var t:Touch;
    if(!hasTouched && Input.touchCount >= 1) // pressed
    {
        hasTouched = true;
        	 t = Input.GetTouch(0);
        lastPos = t.position;
//        yourObject = Instantiate(someObjectPrefab, lastPos, Quaternion.Identity)
	    var tp_w1:Vector3 = mCamera.ScreenToWorldPoint(t.position);
		if (moving_cat == null)
	         	catchCat(tp_w1);
		if (moving_cat !=null)
			moving_cat.Update();
    }
    else if(hasTouched && Input.touchCount >= 1) // finger down
    {
    	 t = Input.GetTouch(0);
        lastPos = t.position;
//        yourObject.transform.Position = Camera.main.ViewportToWorldPoint(lastPos);
		trackTouch(t);
    }
    else if(hasTouched && Input.touchCount == 0) // released
    {
//        Vector3 direction = Input.touches[0].position - lastPos;
//        yourObject.Rigidbody.velocity = direction.normalized*someSpeedValue;

 		if (moving_cat	 != null){
        		
        		// put into grid
        		if (moving_cat == Cat.matrix[moving_cat.mi_x, moving_cat.mi_y])
        		{
        			var v1:Vector3 = Cat.posToFloat(new Vector3(moving_cat.mi_x, moving_cat.mi_y, 0));
        			moving_cat.transform.position.x = v1.x;
        			moving_cat.transform.position.y = v1.y;
        			moving_cat.setStatus(2);
        		}else
               		moving_cat.setStatus(1);
               	
               	moving_cat.Update();
        		moving_cat = null;
        }
    		
		hasTouched = false;
  			  
    }
}

function trackTouch(t:Touch){
			        var tp_w:Vector3 = mCamera.ScreenToWorldPoint(t.position);
			        var x:int;
			 
			   	 	x = tp_w.x+3.5f;
			
				var y:int = tp_w.y;
			
         	//	Debug.Log("move to "+tp_w);
				
				if (moving_cat != null){
				//Debug.Log("touche("+tp_w+") move(x="+x+", y="+y+", moving_cat="+moving_cat + ", oldpos="+moving_cat.mf_x+","+moving_cat.mf_y);
     
					if ((y < 0) || (Cat.matrix[x,y]  != null && Cat.matrix[x,y] != moving_cat)){ 
							// if current position occupied by other cat or lower than floor
							// revert to last position
						  	moving_cat.transform.position = new Vector3(moving_cat.mf_x, moving_cat.mf_y, 0);
							Debug.Log("revert tomoldpos="+moving_cat.mf_x+","+moving_cat.mf_y);
					}else{ 
					
			  //      Debug.Log("Moved delta "+touchDeltaPosition +", to "+t.position+"("+tp_w+")");
			        // Move object across XY plane
			      //  moving_cat.transform.Translate (touchDeltaPosition.x * drag_cat_speed, touchDeltaPosition.y * drag_cat_speed, 0);
					
//						if (moving_cat.status != 4){
							// check if collide others
					
							var fx2:float = tp_w.x;
							var fy2:float = tp_w.y;
							
							var ix2:int = tp_w.x+3.0f+0.5;
							var iy2:int = tp_w.y;
							
						
							ix2 += 0.5f; // test right
							if (ix2 > 6){
								if (Cat.matrix[6, iy2] == null){
									fx2 = 3.0f;
								}else{
									fx2 = moving_cat.mf_x;
								}
								fy2 = moving_cat.mf_y;
							}else if (Cat.matrix[ix2, iy2] != null && Cat.matrix[ix2, iy2] != moving_cat ){
								Debug.Log("collide right, fx2 "+ fx2+ " revert to "+ moving_cat.mf_x+","+moving_cat.mf_y);
								if (ix2> 0 && Cat.matrix[ix2-1, iy2] == null)
									fx2 = ix2-1-3;
								else
									fx2 = moving_cat.mf_x;
								fy2 = moving_cat.mf_y;
							}
							
							ix2  = tp_w.x+3.0f+0.5f-0.5f; // test left
							if (ix2 < 0 || (Cat.matrix[ix2, iy2] != null && Cat.matrix[ix2, iy2] != moving_cat)  ){
								if (ix2 < 0){
									ix2= -1;
								}
								if (Cat.matrix[ix2+1, iy2] == null)
									fx2 = ix2 +1 -3;
								else
									fx2 = moving_cat.mf_x;
								fy2 = moving_cat.mf_y;
								Debug.Log("collide left, fx2 "+ fx2+ " revert to "+ moving_cat.mf_x+","+moving_cat.mf_y);
							}
							
							ix2 = tp_w.x+3.5f;
							iy2 = tp_w.y +0.5f;
							if ( Cat.matrix[ix2, iy2] != null && Cat.matrix[ix2, iy2] != moving_cat){
								fy2 = moving_cat.mf_y;
								fx2 = moving_cat.mf_x;
								Debug.Log("collide above, fx2 "+ fx2+ " revert to "+ moving_cat.mf_x+","+moving_cat.mf_y);
							}
							
							iy2 = tp_w.y - 0.5f; // test down 
							if (iy2 < 0 || ( Cat.matrix[ix2, iy2] != null && Cat.matrix[ix2, iy2] != moving_cat)){
								if (iy2 < 0){
									iy2 = -1;
								}
								if (Cat.matrix[ix2, iy2+1] == null)
									fy2 = iy2 + 1 +1;
								else
									fy2 = moving_cat.mf_y;
								fx2 = moving_cat.mf_x;
								Debug.Log("collide down with "+ix2+ ","+ iy2+", fx2 "+ fx2+ " revert to "+ moving_cat.mf_x+","+moving_cat.mf_y);
							}
							
							
							// test up
							if (tp_w.y >=9.5){
								fy2 = moving_cat.mf_y;
								fx2 = moving_cat.mf_x;
								Debug.Log("collide ceiling with "+ix2+ ","+ iy2+", fx2 "+ fx2+ " revert to "+ moving_cat.mf_x+","+moving_cat.mf_y);
							}
							
							//moving_cat.transform.position = new Vector3(tp_w.x, tp_w.y, 0);  
							moving_cat.mf_x = fx2;
							moving_cat.mf_y = fy2;
							moving_cat.transform.position = new Vector3(fx2, fy2, 0);
							//cat.mf_y = y + 0.5f;
							
							//Debug.Log("Moved delta "+touchDeltaPosition +", to "+t.position+"("+tp_w+")"+ moving_cat.transform.position);
							// check if it just leave its own position
							var np:Vector3 = Cat.floatToPos(moving_cat.transform.position);
							if ( (moving_cat.mi_x != np.x || moving_cat.mi_y != np.y) && Cat.matrix[moving_cat.mi_x,moving_cat.mi_y] == moving_cat){			
								Cat.matrix[moving_cat.mi_x,moving_cat.mi_y] = null;
								pullDownCat(moving_cat.mi_x,moving_cat.mi_y);
							 } 
//						}
//						else{
//							var a = x- moving_cat.transform.position.x;
//							var b = y+0.5 - moving_cat.transform.position.y;
//							//moving_cat.transform.position = new Vector3(x, y+0.5f, 0);
//							moving_cat.transform.Translate(new Vector3(a, b, 0));
//							moving_cat.status = 3;
//						}
					
					}
					
				}
				else { // moving_cat == null
					catchCat(tp_w);
				 	
			
				}
		//		Debug.Log("touch moved");
				if (moving_cat !=null)
					moving_cat.Update();
}







function handleTouch(){
//	var mCamera:Camera = Camera.main;
 //Debug.Log("handle input");
 for (var i = 0; i < Input.touchCount; ++i) {
	   var t:Touch = Input.GetTouch(i);
        if (t.phase == TouchPhase.Began) {
       //    Debug.Log("touche began");
  /*         explode(Input.GetTouch(i).position, Quaternion.identity);
           var touch = Input.GetTouch(i);
           var ray:Ray = mCamera.ScreenPointToRay (new Vector3 (touch.position.x, touch.position.y,0));
           var hits:RaycastHit[];
           hits = Physics.RaycastAll (ray, 50);
           if (hits.Length	> 0){
           		for (var j = hits.Length-1; j >=0;j++){
           		 var c = hits[j].collider;
  			 	 Debug.Log("touching "+c.tag);
  			  
	  			   if (c.tag == "cat"){
	  			 	 moving_cat = c.GetComponent("Cat");
	  			  	 moving_cat.status = 3;
	  			  }
  			   }
  			}*/
  			    var tp_w1:Vector3 = mCamera.ScreenToWorldPoint(t.position);
			     var x1:int = tp_w1.x;
				var y1:int = tp_w1.y;
				x1+=2;
      //   	Debug.Log("touche move(x="+x1+", y="+y1+", cat="+Cat.matrix[x1,y1]);
         /*	if (Cat.matrix[x1,y1] == null){
         		for (var ll = 0; ll < 7; ll ++){
         			for (var lll = 0; lll < 7; lll ++)
         				
         				Debug.Log("matrix["+ll+"]["+lll+"]="+Cat.matrix[ll,lll]);
         		}
         	}*/
        // 	Debug.Log("touch to "+tp_w1);
	     	if (moving_cat == null)
	         	catchCat(tp_w1);
 			if (moving_cat !=null)
				moving_cat.Update();
        }else
         if (Input.GetTouch(i).phase == TouchPhase.Moved ){
         		
			         // Get movement of the finger since last frame
			        var touchDeltaPosition:Vector2 = Input.GetTouch(i).deltaPosition;
			        var tp_w:Vector3 = mCamera.ScreenToWorldPoint(t.position);
			        var x:int;
			 
			   	 	x = tp_w.x+3.5f;
			
				var y:int = tp_w.y;
			
         	//	Debug.Log("move to "+tp_w);
				
				if (moving_cat != null){
				//Debug.Log("touche("+tp_w+") move(x="+x+", y="+y+", moving_cat="+moving_cat + ", oldpos="+moving_cat.mf_x+","+moving_cat.mf_y);
     
					if ((y < 0) || (Cat.matrix[x,y]  != null && Cat.matrix[x,y] != moving_cat)){ // current position occupied by other cat
							
							// revert to last position
						  	moving_cat.transform.position = new Vector3(moving_cat.mf_x, moving_cat.mf_y, 0);
							Debug.Log("revert tomoldpos="+moving_cat.mf_x+","+moving_cat.mf_y);
					}else{ 
					
			  //      Debug.Log("Moved delta "+touchDeltaPosition +", to "+t.position+"("+tp_w+")");
			        // Move object across XY plane
			      //  moving_cat.transform.Translate (touchDeltaPosition.x * drag_cat_speed, touchDeltaPosition.y * drag_cat_speed, 0);
					
//						if (moving_cat.status != 4){
							// check if collide others
					
							var fx2:float = tp_w.x;
							var fy2:float = tp_w.y;
							
							var ix2:int = tp_w.x+3.0f+0.5+0.5f;
							var iy2:int = tp_w.y;
							
						
							
							if (  ix2 > 7   || (Cat.matrix[ix2, iy2] != null && Cat.matrix[ix2, iy2] != moving_cat) ){
								Debug.Log("collide right, fx2 "+ fx2+ " revert to "+ moving_cat.mf_x+","+moving_cat.mf_y);
								fx2 = moving_cat.mf_x;
								fy2 = moving_cat.mf_y;
							}
							
							ix2  = tp_w.x+3.0f+0.5f-0.5f;
							if (ix2 < 0 || (Cat.matrix[ix2, iy2] != null && Cat.matrix[ix2, iy2] != moving_cat)  ){
								fx2 = moving_cat.mf_x;
								fy2 = moving_cat.mf_y;
								Debug.Log("collide left, fx2 "+ fx2+ " revert to "+ moving_cat.mf_x+","+moving_cat.mf_y);
							}
							
							ix2 = tp_w.x+3.5f;
							iy2 = tp_w.y +0.5f;
							if ( Cat.matrix[ix2, iy2] != null && Cat.matrix[ix2, iy2] != moving_cat){
								fy2 = moving_cat.mf_y;
								fx2 = moving_cat.mf_x;
								Debug.Log("collide above, fx2 "+ fx2+ " revert to "+ moving_cat.mf_x+","+moving_cat.mf_y);
							}
							
							iy2 = tp_w.y - 0.5f;
							if (iy2 < 0 || ( Cat.matrix[ix2, iy2] != null && Cat.matrix[ix2, iy2] != moving_cat)){
								fy2 = moving_cat.mf_y;
								fx2 = moving_cat.mf_x;
								Debug.Log("collide down with "+ix2+ ","+ iy2+", fx2 "+ fx2+ " revert to "+ moving_cat.mf_x+","+moving_cat.mf_y);
							}
							
							
							if (tp_w.y >=9.5){
								fy2 = moving_cat.mf_y;
								fx2 = moving_cat.mf_x;
								Debug.Log("collide ceiling with "+ix2+ ","+ iy2+", fx2 "+ fx2+ " revert to "+ moving_cat.mf_x+","+moving_cat.mf_y);
							}
							
							//moving_cat.transform.position = new Vector3(tp_w.x, tp_w.y, 0);  
							moving_cat.mf_x = fx2;
							moving_cat.mf_y = fy2;
							moving_cat.transform.position = new Vector3(fx2, fy2, 0);
							//cat.mf_y = y + 0.5f;
							
							//Debug.Log("Moved delta "+touchDeltaPosition +", to "+t.position+"("+tp_w+")"+ moving_cat.transform.position);
							// check if it just leave its own position
							var np:Vector3 = Cat.floatToPos(moving_cat.transform.position);
							if ( (moving_cat.mi_x != np.x || moving_cat.mi_y != np.y) && Cat.matrix[moving_cat.mi_x,moving_cat.mi_y] == moving_cat){			
								Cat.matrix[moving_cat.mi_x,moving_cat.mi_y] = null;
								pullDownCat(moving_cat.mi_x,moving_cat.mi_y);
							 } 
//						}
//						else{
//							var a = x- moving_cat.transform.position.x;
//							var b = y+0.5 - moving_cat.transform.position.y;
//							//moving_cat.transform.position = new Vector3(x, y+0.5f, 0);
//							moving_cat.transform.Translate(new Vector3(a, b, 0));
//							moving_cat.status = 3;
//						}
					
					}
					
				}
				else { // moving_cat == null
					catchCat(tp_w);
				 	
			
				}
		//		Debug.Log("touch moved");
				if (moving_cat !=null)
					moving_cat.Update();
				break;
          } else if (Input.GetTouch(i).phase == TouchPhase.Ended || Input.GetTouch(i).phase == TouchPhase.Canceled){
         // Debug.Log("touche end");
       		 if (moving_cat	 != null){
        		// put into grid
        	/*	Debug.Log("moving_cat="+moving_cat+ " pos=" + moving_cat.transform.position);
        		var ix:int;
        	
        			ix = moving_cat.transform.position.x+3.5f;
        			ix -= 2;
        			
        		//if (moving_cat.transform.position.x - ix > 0.5f)
        			//ix ++;
        			
        		moving_cat.transform.position = new Vector3(ix, moving_cat.transform.position.y, moving_cat.transform.position.z);
        		*/
        		if (moving_cat == Cat.matrix[moving_cat.mi_x, moving_cat.mi_y]){
        			var v1:Vector3 = Cat.posToFloat(new Vector3(moving_cat.mi_x, moving_cat.mi_y, 0));
        			moving_cat.transform.position.x = v1.x;
        			moving_cat.transform.position.y = v1.y;
        			moving_cat.setStatus(2);
        		}else
               		moving_cat.setStatus(1);
               	moving_cat.Update();
        		moving_cat = null;
        	}
        	break;
        }
        
    }
}

function catchCat(tp_w:Vector3){
	var _p:Vector3 = Cat.floatToPos(tp_w);
	
	var x:int = _p.x;	 
	var y:int = _p.y;
	if ( (x -1 < 0 || Cat.matrix[x-1, y] != null) 
		&& (x+1>CentralController.catrow_size ||  Cat.matrix[x+1,y] != null)
		 && ( y<1 || Cat.matrix[x, y-1] != null) 
		 && (y>CentralController.catcol_size || Cat.matrix[x, y+1] != null) ){
					
	}else{
		if (Cat.matrix[x,y] != null){
			
			moving_cat = Cat.matrix[x,y];
			Debug.Log("moving cat = " + moving_cat.name +", "+x+", "+y);
		//	Cat.matrix[x,y] = null;
			moving_cat.setStatus(3);
		
			
		}
	}
}


function pullDownCat(x:int, y:int){
// pull down above cat
		for (var j=y+1; j< 10; j++){
			var c:Cat = Cat.matrix[x,j];
			if (c != null){
				c.setStatus(1);
				Cat.matrix[x,j]=null;
				//c.transform.position = new Vector3( c.transform.position.x, c.transform.position.y+0.5f*j, c.transform.position.z); 
			}
		}
			
}