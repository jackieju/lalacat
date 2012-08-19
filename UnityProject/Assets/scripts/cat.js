
public var speed:float;
private var status:int;
function start(){
	status = 0; // before drop
}

function Update () {
	
	//Debug.Log("update cat");
	//var a = Input.GetAxisRaw("Vertical");
	if (status < 2){
		var distance = speed * Time.deltaTime;
		//Debug.Log("distance="+distance+ ", z="+transform.position.z);
		transform.Translate(Vector3.down*distance);
	
		if (transform.position	.y	<0){
			     transform.position = new Vector3( transform.position.x, 0.5, transform.position.z);
			     status = 2;
		}
		
	}
}

function OnCollisionEnter(obj:Collision)
{
	  //  for (var contact : ContactPoint in obj.contacts) {
        //print(contact.thisCollider.name + " hit " + contact.otherCollider.name);
        // Visualize the contact point
        //Debug.DrawRay(contact.point, contact.normal, Color.white);
    //}
      Debug.Log("collide "+obj.gameObject.name + ", normal="+obj.contacts[0].normal+", speed="+obj.relativeVelocity+"," + "position:"+transform.position.x +","+transform.position.y);
	  var i = 0;
	  for (i =0; i< obj.contacts.length;i++)
	//  	Debug.Log("contacts["+i+"]="+obj.contacts[i].normal);
  //   if (obj.relativeVelocity.magnitude > 0)
 	if (obj.contacts.Length>3 && obj.contacts[0].normal.y == 1.0f){
 	Debug.Log("hold");
        status = 2;
        var y:float=0;
        if (obj.transform	.position	.y	 == 0)
        	y = 0.5f;
        else
        	
         y= obj.transform.position.y+1.0f;
        transform.position = new Vector3( transform.position.x, y, transform.position.z);
     }
}

function OnTriggerEnter(obj:Collider){

  //    Debug.Log("collide2 "+obj.gameObject.name + ", normal="+obj.contacts[0].normal+", speed="+obj.relativeVelocity+"," + "position:"+transform.position.x +","+transform.position.y);
	Debug.Log("OnTriggerEnter:"+obj.name+", position:"+obj.transform.position);
	
	     // status = 2;
      //  var y:float=0;
       // if (obj.transform	.position	.y	 == 0)
        	//y = 0.5f;
        //else
         //y= obj.transform.position.y+1.0f;
         
      //  transform.position = new Vector3( transform.position.x, y, transform.position.z);
  //    var ray : Ray = Camera.main.ScreenPointToRay (Input.mousePosition);
      var ray:Ray = Ray(transform.position, new Vector3(0, -1, 0));
      var hit : RaycastHit;
      if (obj.Raycast (ray, hit, 100.0)) {
      	Debug.Log("hit");
        Debug.DrawLine (ray.origin, hit.point);
        status = 2;
    }
}



