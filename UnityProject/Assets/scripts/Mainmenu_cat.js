
var offset_x:float = 0;
var d = 0;
var spantime:float =0;
var spantime2:float = 0;

function Update () {
	//Debug.Log("offset_x="+offset_x +", delttime="+Time.deltaTime+", st2="+spantime2+", st1="+spantime);

	if (spantime2 > 2.0f){
	
		spantime +=Time.deltaTime;
		
		if (spantime > 0 && spantime< 0.1f){
			offset_x = 0.5;
		
		}else if (spantime < 0.2f){
			offset_x =0.75f;
		}else if (spantime < 0.3f){
			offset_x = 1.0f;
		}
		else if (spantime < 0.4f){
			offset_x = 0.75f;
		}else if (spantime < 0.5f){
			//offset_x = 1.0f*1.0f/3.0f;
			offset_x = 0.5;
	
		}else if (spantime < 0.6f){
			//offset_x = 1.0f*1.0f/3.0f;
			offset_x = 0.25f;
	
		
				spantime = 0; // reset animation timer
			spantime2 = 0; // start outer timer
		}
	 
	}else{
	
	 spantime2 += Time.deltaTime;
	}

/*
	if (spantime > 0.3f){
	if (d == 0){
		offset_x += 1.0f/3.0f;
		if (offset_x >=1 )
		d = 1;
		}else{
			offset_x -= 1.0f/3.0f;
			if (offset_x <= 0)
			d =0;
		
		}
		spantime = 0;
	}*/
	gameObject.renderer.material.mainTextureOffset = new Vector2(offset_x, 0);
}