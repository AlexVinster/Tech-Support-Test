using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        int red = 0, green = 0, blue = 0, 
            inputColor = -1;
        bool validInput = false;

        // Input validation
        while (!validInput)
        {
            try
            {
                Console.WriteLine("Enter the number of hedgehogs: [red, green, blue]:");
                string[] input = Console.ReadLine().Split(',');
                red = int.Parse(input[0].Trim());
                green = int.Parse(input[1].Trim());
                blue = int.Parse(input[2].Trim());

                if (red < 0 || green < 0 || blue < 0)
                {
                    throw new Exception("Number of hedgehogs cannot be negative.");
                }

                validInput = true;
            }
            catch (Exception error)
            {
                Console.WriteLine("Invalid input format. Please try again. " + error.Message);
            }
        }

        validInput = false;

        // Input color validation
        while (!validInput)
        {
            try
            {
                Console.WriteLine("Enter the desired color (0 - red, 1 - green, 2 - blue):");
                inputColor = int.Parse(Console.ReadLine().Trim());

                if (inputColor < 0 || inputColor > 2)
                {
                    throw new Exception("Invalid color.");
                }

                validInput = true;
            }
            catch (Exception error)
            {
                Console.WriteLine("Invalid input format. Please try again. " + error.Message);
            }
        }

        
        int result = GetMinimumMeetings(red, green, blue, inputColor); // Result of minimum meetings


        if (result != -1)
        {
            Console.WriteLine($"Minimum number of meetings: {result}");
        }
        else
        {
            Console.WriteLine("It is impossible to convert all hedgehogs to the desired color.");
        }
    }

    static int GetMinimumMeetings(int red, int green, int blue, int inputColor)
    {

        if ((inputColor == 0 && green == 0 && blue == 0) ||
            (inputColor == 1 && red == 0 && blue == 0) ||
            (inputColor == 2 && red == 0 && green == 0))
        {
            return 0; // All hedgehogs are already the desired color
        }

        int meetings = 0;
        var hash = new HashSet<string>(); // Keep previoustly numbers

        Console.WriteLine($"Initial state: [{red}, {green}, {blue}]");

        while (red > 0 || green > 0 || blue > 0)
        {
            string state = $"{red},{green},{blue}";
            if (hash.Contains(state))
            {
                return -1; // Impossible to transform
            }
            hash.Add(state);

            // Change colors
            if (inputColor == 0) // Color is red
            {
                if (green > 0 && blue > 0)
                {
                    green--;
                    blue--;
                    red += 2;
                    Console.WriteLine($"green and blue [{red}, {green}, {blue}]");
                }
                else if (red > 0 && green > 0)
                {
                    red--;
                    green--;
                    blue += 2;
                    Console.WriteLine($"red and green [{red}, {green}, {blue}]");
                }
                else if (red > 0 && blue > 0)
                {
                    red--;
                    blue--;
                    green += 2;
                    Console.WriteLine($"red and blue [{red}, {green}, {blue}]");
                }
            }
            else if (inputColor == 1) // Color is green
            {
                if (red > 0 && blue > 0)
                {
                    red--;
                    blue--;
                    green += 2;
                    Console.WriteLine($"red and blue [{red}, {green}, {blue}]");
                }
                else if (green > 0 && red > 0)
                {
                    green--;
                    red--;
                    blue += 2;
                    Console.WriteLine($"green and red [{red}, {green}, {blue}]");
                }
                else if (green > 0 && blue > 0)
                {
                    green--;
                    blue--;
                    red += 2;
                    Console.WriteLine($"green and blue [{red}, {green}, {blue}]");
                }
            }
            else if (inputColor == 2) // Color is blue
            {
                if (red > 0 && green > 0)
                {
                    red--;
                    green--;
                    blue += 2;
                    Console.WriteLine($"red and green [{red}, {green}, {blue}]");
                }
                else if (red > 0 && blue > 0)
                {
                    red--;
                    blue--;
                    green += 2;
                    Console.WriteLine($"red and blue [{red}, {green}, {blue}]");
                }
                else if (green > 0 && blue > 0)
                {
                    green--;
                    blue--;
                    red += 2;
                    Console.WriteLine($"green and blue [{red}, {green}, {blue}]");
                }
            }

            meetings++;

            // Check for reaching the color
            if ((inputColor == 0 && green == 0 && blue == 0) ||
                (inputColor == 1 && red == 0 && blue == 0) ||
                (inputColor == 2 && red == 0 && green == 0))
            {
                return meetings;
            }
        }

        return -1;
    }
}
