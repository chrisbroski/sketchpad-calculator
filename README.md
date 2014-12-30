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

If you'd like to just right to the wireframe prototype, it's on my [github pages](http://chrisbroski.github.io/sketchpad-calculator/sketchpad-calc.html) But remember:

###It's Buggy

It's a proof-of-concept meant for UI reserach and still far from a commercial product. 

###Features

I only wanted critical features, or ones that could be uniquely demonstrated in this type of UI. I chose:

* Make number and operator entry as simple as possible with no extra buttons or keystrokes.
* No "order of operation" - calculations are made in top-to-bottom order only.
* Fake cursor to indicate active area.
* Manual entry using a keypad of a computer keyboard.
* Operators for addition, subtraction, multiplication, and division only.
* Allow positive, negative, and decimal numbers (no scientific notation entry).
* Running history of all calculations in this session.
* Click on a number in history to use that number in the active calculation.
* Specify the amount of precision for reasonable rounding.

Most of these features are hopefully self-explanatory so I'll only talk about a couple that I think deserve mention.

####Click History to Insert Into Active Calcuation

This is a fancy feature, and I had said that I wanted to keep it simple. I justified adding this because the running history of past calculations just screams for this ability. (If my experimental UI doesn't bring anything new and cool to the table, what is it's value?) This was a pain point for me when using the 1-at-a-time calculations of traditional calculator. I always seemed to be re-entering numbers that I had recently seen on the screen, but were now lost to the void.

####Custom Precision Rounding

This is another thing that is significantly different than most other calculation software. I was hoping to avoid having to deal with it but it became necessary very quickly. Division can easily produce are large amount of digits after the decimal that are nonsensical and hard to read. Also, with JavaScript converting numbers to floating-point you can get soem unexpected results. (Try adding 0.1 and 0.2 in your Chrome console.) It is also a pet peeve of mine that nobody (apart from Chemists it seems) understands how to use significant figures to determine the proper precision of a the final result.

I'd like to say I solved this, but I can't say that, because I didn't. So instead, in the spirit of experimentation, I implemented a bunch of solutions. My favorite one (labelled "proper") keeps track of the number with the least amount of significant figures in the active calculation and then rounds to that precision. As much as it is "poper" is is awkward to work with. All result are foced to exponential notation and god forbid if you include a single-digit operand that dumps the rsult down to a single digit of precision. I included some fixed amounts of precision (2 through 14) that seems to work OK. Calculators have their own weird formatting rules that round indiscriminate of significant figures. I threw together something that works like that and labelled it "vulgar." I reluctantly admit that it gives the most intuitive results. At least I got to name it something derogatory, so that makes me feel a little better.
