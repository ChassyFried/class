using System.Drawing;
using System;

namespace Class48 {
    public class Styles {
        public string Color { get; set; }
        public string Pattern { get; set; }

        public Styles(string color, string pattern) {
            Color = color;
            Pattern = pattern;
        }

         public void PrintShirts() {
          
            Console.WriteLine($"{Color} , {Pattern}");
        }


    }

}
