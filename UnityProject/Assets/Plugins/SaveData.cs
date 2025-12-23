using UnityEngine;

using System.Collections;

 

using System.Text;

using System.IO;

using System.Runtime.Serialization.Formatters.Binary;

 

using System;

using System.Runtime.Serialization;

using System.Reflection;

 

//---Class that will hold all the info---//

[Serializable ()]   //Serial tag

public class SaveDeck : ISerializable {  

    //---variables to be saved---

    public int intValue1 = 0;

    public bool boolValue1 = true;

    public string stringValue1 = "Default";

    public string[] stringArray1;

 

    public SaveDeck () {

    } //constructor

 

    //constructor that is called/

    public SaveDeck (SerializationInfo info, StreamingContext ctxt)

    {

        //Get values from passed object info and assign it to the data

        intValue1 = (int)info.GetValue("intValue1", typeof(int));

        boolValue1 = (bool)info.GetValue("boolValue1", typeof(bool));

        stringValue1 = (string)info.GetValue("stringValue1", typeof(string));

        stringArray1 = (string[])info.GetValue("stringArray1", typeof(string[]));

    }

 

    //Serialization function

    public void GetObjectData (SerializationInfo info, StreamingContext ctxt)

    {

        info.AddValue("intValue1", intValue1);

        info.AddValue("boolValue1", (boolValue1));

        info.AddValue("stringValue1", stringValue1);

        info.AddValue("stringArray1", stringArray1);

    }

}