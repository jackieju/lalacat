using UnityEngine;

using System.Collections;

 

using System.Text;

using System.IO;

using System.Runtime.Serialization.Formatters.Binary;

 

using System;

using System.Runtime.Serialization;

using System.Reflection;


 

///Save and Load class that is called

public class SaveNLoad : MonoBehaviour {

    

    public static string currentFilePath = "File.path";

    

    //Called to write data

    public static void Save (SaveDeck data) {

        if (data == null)

            data = new SaveDeck();

        Save(currentFilePath, data);

    }

    

    //called to save data to a different path/file name

    public static void Save (string filePath, SaveDeck data)

    {

    Stream stream = File.Open(filePath, FileMode.Create);

    BinaryFormatter bformatter = new BinaryFormatter();

    bformatter.Binder = new VersionDeserializationBinder();

    bformatter.Serialize(stream, data);

    stream.Close();

    }

    

    //Call to load data from file

    public void Load () {

        Load(currentFilePath);

    }

    

    public static SaveDeck Load (string filePath)

    {

        SaveDeck data = new SaveDeck ();

        Stream stream = File.Open(filePath, FileMode.Open);

        BinaryFormatter bformatter = new BinaryFormatter();

        bformatter.Binder = new VersionDeserializationBinder();

        data = (SaveDeck)bformatter.Deserialize(stream);

        stream.Close();

        return data;

        //use 'data' to access values

    }

}

 

// === This is required to guarantee a fixed serialization assembly name, which Unity likes to randomize on each compile

// Do not change this

public sealed class VersionDeserializationBinder : SerializationBinder 

{ 

    public override Type BindToType( string assemblyName, string typeName )

    { 

        if ( !string.IsNullOrEmpty( assemblyName ) && !string.IsNullOrEmpty( typeName ) ) 

        { 

            Type typeToDeserialize = null; 

            assemblyName = Assembly.GetExecutingAssembly().FullName; 

            // The following line of code returns the type. 

            typeToDeserialize = Type.GetType( String.Format( "{0}, {1}", typeName, assemblyName ) ); 

            return typeToDeserialize; 

        } 

        return null; 

    } 

}