//****************************************************************************************************
//  static function DrawLine(rect : Rect) : void
//  static function DrawLine(rect : Rect, color : Color) : void
//  static function DrawLine(rect : Rect, width : float) : void
//  static function DrawLine(rect : Rect, color : Color, width : float) : void
//  static function DrawLine(pointA : Vector2, pointB : Vector2) : void
//  static function DrawLine(pointA : Vector2, pointB : Vector2, color : Color) : void
//  static function DrawLine(pointA : Vector2, pointB : Vector2, width : float) : void
//  static function DrawLine(pointA : Vector2, pointB : Vector2, color : Color, width : float) : void
//  
//  Draws a GUI line on the screen in an Editor window.
//  
//  DrawLine makes up for the severe lack of 2D line rendering in the Unity runtime GUI system.
//  This function works by drawing a 1x1 texture filled with a color, which is then scaled
//   and rotated by altering the GUI matrix.  The matrix is restored afterwards.
//  There seems to a bug in how GUI.matrix is applied within Editor windows, so this version
//  of the script employs a little hack to work around it
//****************************************************************************************************
 
static var lineTex : Texture2D;
 
static function DrawLine(rect : Rect) { DrawLine(rect, GUI.contentColor, 1.0); }
static function DrawLine(rect : Rect, color : Color) { DrawLine(rect, color, 1.0); }
static function DrawLine(rect : Rect, width : float) { DrawLine(rect, GUI.contentColor, width); }
static function DrawLine(rect : Rect, color : Color, width : float) { DrawLine(Vector2(rect.x, rect.y), Vector2(rect.x + rect.width, rect.y + rect.height), color, width); }
static function DrawLine(pointA : Vector2, pointB : Vector2) { DrawLine(pointA, pointB, GUI.contentColor, 1.0); }
static function DrawLine(pointA : Vector2, pointB : Vector2, color : Color) { DrawLine(pointA, pointB, color, 1.0); }
static function DrawLine(pointA : Vector2, pointB : Vector2, width : float) { DrawLine(pointA, pointB, GUI.contentColor, width); }
static function DrawLine(pointA : Vector2, pointB : Vector2, color : Color, width : float) {
    // Save the current GUI matrix, since we're going to make changes to it.
    var matrix = GUI.matrix;
    GUI.matrix = Matrix4x4.identity;
 
    // Generate a single pixel texture if it doesn't exist
    if (!lineTex) {
    	lineTex = Texture2D(1, 1);
    	lineTex.SetPixel(0, 0, Color.white);
    	lineTex.Apply();
    }
 
    // Store current GUI color, so we can switch it back later,
    // and set the GUI color to the color parameter
    var savedColor = GUI.color;
    GUI.color = color;
 
    // Use Scale to adjust the size of the line.
    // We could do this when we draw the texture, but by scaling it here we can use
    //  non-integer values for the width and length (such as sub 1 pixel widths).
    // Note that the pivot point is at +.5 from pointA.y, this is so that the width of the line
    //  is centered on the origin at pointA.
 
    // Set the rotation for the line.
    //  The angle was calculated with pointA as the origin.
 
 
   // For some reason, when used in an Editor window, everything is rotated around the wrong place until some kind of offset is used. The exact value of this was a bit of guesswork - your mileage may vary. Think this is probably a bug in how GUI.matrix is applied.
    var offset : Vector2 = new Vector2(0, -20);
 
    // Set the GUI matrix to rotate around a pivot point
    // We're doing a 3-stage matrix multiplication since we don't want to rotate around the origin - there's a weird offset bug in the way the GUI is rendered that needs to be worked around   
    offset += Vector2(0, 0.5); // Compensate for line width
    var guiRot : Quaternion = Quaternion.FromToRotation(Vector2.right, pointB-pointA);
    var guiRotMat : Matrix4x4 = Matrix4x4.TRS(pointA, guiRot, new Vector3((pointB-pointA).magnitude, width, 1));
    var guiTransMat : Matrix4x4 = Matrix4x4.TRS(offset, Quaternion.identity, Vector3.one);
    var guiTransMatInv : Matrix4x4 = Matrix4x4.TRS(-offset, Quaternion.identity, Vector3.one);
 
    GUI.matrix = guiTransMatInv * guiRotMat * guiTransMat;
 
    // Finally, draw the actual line.
    // We're really only drawing a 1x1 texture from pointA.
    // The matrix operations done with Scale, Rotate and Translate will make this
    //  render with the proper width, length, and angle and position
    GUI.DrawTexture(Rect(0, 0, 1, 1), lineTex);
 
    // We're done.  Restore the GUI matrix and GUI color to whatever they were before.
    GUI.matrix = matrix;
    GUI.color = savedColor;
}