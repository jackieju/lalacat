var frames=0;
var updateInterval:float=0.5f;
var fps;
var accum:float=0.0f;
var timeLeft:float;
function Start()
{
    timeLeft=updateInterval;
}
function Update()
{
    timeLeft-=Time.deltaTime;
    accum+=Time.timeScale/Time.deltaTime;
    ++frames;
    if(timeLeft<=0.0f)
    {
       fps=(accum/frames).ToString("f2");
       timeLeft=updateInterval;
       accum=0.0f;
       frames=0;
    }
}
function OnGUI()
{
   GUI.Box(Rect(20,80,200,50),"FPS:"+fps);
}
