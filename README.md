Sketchpad Calculator
====================

I was doing some quick math with a pencil and pad of paper the other day, then dug up a calculator on my phone to do some of the more complicated math and wondered why I needed to use both. When calculators and adding machines were developed, they were miracles of engineering. But the newness of the technology limited the user interface. We have grown up with using calculators how they were designed, by not asking if there is a better way.

Now that building a fancy UI can be done by anyone with a web browser and text editor (and arithmatic is a core feature of any programming lanugage) maybe it is time to revisit the design of this common UI to explore methods of making it more intuitive.

The Goal
--------

I wanted to build a software UI that mimics how a person might perform simple calculations on a piece of paper. Once a minimum viable proof of concept is finished, use it to answer some questions:

* What are the benefits over traditional calculator interfaces? 
* What are the weaknesses? Where does it fail?
* Though it was never intended to be a tool for all types of calculations, what features are needed to make it useful for common use?
* Does it show enough promise to continue research and development, or are there clear deal-breakers that make the approach inherently flawed.

Development
-----------

If you'd like to just right to the wireframe prototype, it's on my github pages /sketchpad-calculator/sketchpad-calc.html But remember:

###It's Buggy

It's a proof-of-concept meant for UI reserach and still far from a commercial product. 

###Features

I only wanted critical features, or ones that could be uniquely demonstrated in this type of UI. I chose:

* Make number and operator entry as simple as possible with no extra buttons or keystrokes.
* Fake cursor to indicate active area
* Manual entry using a keypad of a computer keyboard.
* Operators for addition, subtraction, multiplication, and division only.
* Allow positive, negative, and decimal numbers (no scientific notation entry)
* Running history of all calculations in this session
* Click on a number in history to use that number in the active calculation.
* Specify the amount of precision for reasonable rounding

Most of these features are hopefully self-explanatory so I'll talk talk about a couple that I think deserve mention.

####Click History to Insert Into Active Calcuation

This is a fancy feature, and I had said that I wanted to keep it simple. I justified adding this because the running history of past calculations just screams for this ability. (If my experimental UI doesn't bring anything new and cool to the table, what is it's value?) This was a pain point for me when using the 1-at-a-time calculations of traditional calculator. I always seemed to be re-entering numbers that I had recently seen on the screen, but were now lost to the void.

####Custom Precision Rounding

This is another thing that is significantly different than most other calculation software. 
