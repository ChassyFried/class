using System.Drawing;
using System.Security.Cryptography.X509Certificates;
using System;

namespace Class48 {
    public class Shirt {
        public Shirt(string color, string pattern) {
            Color = color;
            Pattern = pattern;
        }
        static void Main(string[] args) {
            List<Shirt> shirts = new List<Shirt>() {
                //I am assuming there was supposed to be a double forloop here and not hardcoded styles but I could not figure it out
                new Shirt("Red" , "Striped"),
                new Shirt("Red" , "Plaid"),
                new Shirt("Red" , "Checked"),
                new Shirt("Blue" , "Striped"),
                new Shirt("Blue" , "Plaid"),
                new Shirt("Blue" , "Checked"),
                new Shirt("Green" , "Striped"),
                new Shirt("Green" , "Plaid"),
                new Shirt("Green" , "Checked")
            

            };
            foreach (Shirt shirt in shirts) {
                Shirt.DisplayShirts();
            }
        }
    }
}


