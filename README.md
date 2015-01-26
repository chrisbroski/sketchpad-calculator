Sketchpad Calculator
====================

The other day I needed to do some simple calculations. I don't remember if it was to figure out the amount of material I needed for home improvements, to calculate the best value per item for something I needed to purchase, or just helping my daughter with her arithmetic homework. I found a pen and paper to set up the problem, then used the default calculator on my Android phone to perform the calculation. It struck me that I had this amazing hand-held computer at my disposal, but I still needed pen and paper. I saw and need and a challenge. Could I design a calculator UI that would fill need I had to also use paper?

When calculators were first developed, they were miracles of engineering. But the newness of the technology limited the user interface. We have grown up using calculators how they were designed, but not asking if there is a better way. I decided to start asking.

Building a custom UI can be done by anyone with a web browser and text editor (and arithmetic is a core feature of any programming language, so there is no need to re-invent that.) I first wanted to build the simplest implementation of my notepad/pen/calculator hybrid idea quickly, so I could assess if I was wasting my time or if there was potential.

The Goal
--------

Before I started coding, I decided on the questions that I wanted my proof-of-concept to answer.

* What are the benefits of this design over traditional calculator interfaces?
* What are the weaknesses? Where does it fail?
* Though it is not intended to be a tool for all types of calculations, what core features would be needed for common use?
* Does it show enough promise to continue research and development, or are there clear deal-breakers that make the approach inherently flawed?

Prototype UI
------------

I built and deployed my first attempt to [GitHub pages](http://chrisbroski.github.io/sketchpad-calculator/sketchpad-calc.html)

###It's Buggy

It's a proof-of-concept meant for UI research and still far from a commercial product. 

###Features

I only wanted critical features, or ones that could be uniquely demonstrated in this type of UI. I chose:

* Blinking indicator of active input area.
* Manual entry using the keypad of a computer keyboard.
* Operators for addition, subtraction, multiplication, and division only.
* Allow positive, negative, and decimal numbers (no scientific notation entry).
* Running history of all calculations in the active and previous calculations.
* No "order of operation" - calculations are executed in top-to-bottom order only.
* Clicking on a number in history enters that number in the active calculation.
* Specify the amount of precision for reasonable rounding.

Most of these features are hopefully self-explanatory so I'll only talk about a couple that I think deserve mention.

####Click History to Insert Into Active Calculation

This is a fancy feature, and I had said that I wanted to keep it simple. I justified adding this because the running history of past calculations just screams for this ability. (If my experimental UI doesn't bring anything new and cool to the table, what is it's value?) This was a pain point for me when using the 1-at-a-time calculations of traditional calculator. I always seemed to be re-entering numbers that I had recently seen on the screen, but were now lost to the void.

####Custom Precision Rounding

This is another thing that is significantly different than most other calculation software. I was hoping to avoid having to deal with it but it became necessary very quickly. Division can easily produce are large amount of digits after the decimal that are nonsensical and hard to read. Also, with JavaScript converting numbers to floating-point you can get soem unexpected results. (Try adding 0.1 and 0.2 in your Chrome console.) It is also a pet peeve of mine that nobody (apart from Chemists it seems) understands how to use significant figures to determine the proper precision of a the final result.

I'd like to say I solved this, but I can't say that, because I didn't. So instead, in the spirit of experimentation, I implemented a bunch of solutions. My favorite one (labelled "proper") keeps track of the number with the least amount of significant figures in the active calculation and then rounds to that precision. As much as it is "proper" is is awkward to work with. All results are forced to exponential notation and god forbid if you include a single-digit operand that dumps the result down to a single digit of precision. I included some fixed amounts of precision (2 through 14) that seems to work OK. Calculators have their own weird formatting rules that round indiscriminate of significant figures. I threw together something that works like that and labelled it "vulgar." I reluctantly admit that it gives the most intuitive results. At least I got to name it something derogatory, so that makes me feel a little better.

###What I Left Out

There are a few things that the prototype are screaming for. If the results are promising and I get more time, I definitely need to add:

####Backspace

If you make a mistake now, your entire active calculation is broken. This is a key feature of any calculator (even the old one had "CE" which never worked how you thought it would.) Still, I found for interface testing was not as big of a inhibitor is I suspected.

####Mobile UI

I originally meant to build this for a touch screen, but things got complicated fast. I needed to build a custom input UI that was taking up more of my time than it should have. Still, having this available on my phone (application cached and icon on my home screen) is the most appropriate and convenient place for it. Again, if the keyboard experience looks promising, I'll get right on it.

####The Equals Bar is HUGE

This just looks weird and is a terrible use of screen space. Still, I feel that until I have a mobile version, polishing the screen layout is premature.

Results
-------

Now that I have some experience with the prototype, I have formed tentative answers to my proposed questions.

As for benefits over the traditional calculator UI, having the active and previous calcuations displayed is a blatant improvement. (One-click entry of previous numbers is nice too.)

Inherent drawbacks (ones that can't be easily fixed with a little more work) are few. The inability to to proper order of operations is a big one, but if the intended purposed is for short, informal calculations this is probaby OK. You would want to use a different piece of software for performing more formal mathematics anyhow. The mess with precicion I can hopefully get a handle on, but there is no guarentee.

As far as I can guess, adding backspace and mobile UI could make this a viable version 1.0.

It'd be great to gather unbiased feedback on the wireframe, but the unwashed public has been known to struggle without colored gradients, drop shadows, shiny buttons, and rounded corners. With only my opinion to go on, I do believe there is something there. I plan to take the next steps and see if this can develop into a useful productivity app. (That result is mostly dependant on my fight against procrastination so if you want to steal my idea for yourself, go for it.)
