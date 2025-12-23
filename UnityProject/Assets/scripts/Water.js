public var t:Texture[];
public var t_index:int;
public var offset:float = 0;
private var time:float = 0;
function Update () {
	time += Time.deltaTime;
	if (time	> 0.1){
		offset += 0.1;
		
		GetComponent.<Renderer>().material.mainTextureOffset = new Vector2(offset, 0);
		time = 0;
//		Debug.Log("offset "+ offset);
	}

}

