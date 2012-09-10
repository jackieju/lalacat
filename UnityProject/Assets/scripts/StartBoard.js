public var texts:Texture[];
function Start(){
	
	 while (true){
	 	yield WaitForSeconds(0.22);
		renderer.material.mainTexture = texts[1];
		yield WaitForSeconds(0.2);
		renderer.material.mainTexture = texts[2];
		yield WaitForSeconds(0.2);
		renderer.material.mainTexture = texts[1];
		yield WaitForSeconds(0.22);
		renderer.material.mainTexture = texts[0];
	 	yield WaitForSeconds(0.2);
		renderer.material.mainTexture = texts[3];
		yield WaitForSeconds(0.22);
		renderer.material.mainTexture = texts[4];
		yield WaitForSeconds(0.22);
		renderer.material.mainTexture = texts[3];
		yield WaitForSeconds(0.2);
		renderer.material.mainTexture = texts[0];
	 }
}
function Update () {
}