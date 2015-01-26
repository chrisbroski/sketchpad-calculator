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

Making a proof-of-concept UI can require a lot of self-discipline. You must implement all features that will allow you to assess the viability, but leave out all features, no matter how important they might be to the final version, that are not part of the core concept, or are direct requirements to the core concept. I decided to neglect:

###No Mobile Version

Even though the entire point of the project is make a UI for a mobile calculator, designing and testing mobile web is slower and more complex than for the desktop. To increase the speed of testing iterations, I decided to wait until I was happy with a desktop version before working on the mobile interface.

###No Backspace/Delete

Being able to fix minor errors is a great feature for the final version, but for testing? I am just going to use random numbers to test with anyhow so I don't really even need it to calculate correctly to test the UI.

###Features

The features that I decided to include were:

* Blinking indicator (cursor) at active input area.
* Manual entry using the keypad of a computer keyboard only - no touchscreen numberpad yet.
* Operators for addition, subtraction, multiplication, and division only.
* Allow positive, negative, and decimal numbers (no scientific notation entry).
* Running history of all calculations in the active and previous calculations.
* Clicking on a number in history enters that number in the active calculation.
* Specify the amount of precision for reasonable rounding.

Most of these features are predictable but the need for a couple unexpected features arised during development.

####Click History to Insert Into Active Calculation

This is definitely a fancy feature, and I had promised myself to keep it simple, but after a little use of the interface, the running history of past calculations just screamed for this ability. (And if my experimental UI doesn't bring anything new and cool to the table, what is the point of it?) This is exactly the kind of emergent feature I was hoping to discover while experimenting with the new interface. The lack of this functionality was also a pain point for me when using the old fashioned 1-at-a-time calculations of the traditional calculator. I always seemed to be re-entering numbers over and over that I had just seen on the screen, but were now lost to the void.

####Custom Precision Rounding

This is another thing that is significantly different than most other calculation software. I was hoping to avoid having to deal with it but it became necessary very quickly. Division can easily produce a large amount of digits after the decimal that are nonsensical and hurt readability. Also, with JavaScript converting numbers to floating-point you can get some unexpected results. (Try adding 0.1 and 0.2 in your Chrome console.) It is also a pet peeve of mine that nobody (apart from Chemists it seems) understands how to use significant figures to determine the proper precision of a final result.

I'd like to say I solved this, but I can't say that, because I didn't. So instead, in the spirit of experimentation, I implemented a bunch of solutions. My favorite one (labelled "proper") keeps track of the number with the least amount of significant figures in the active calculation and then rounds to that precision. As much as it is "proper", it is awkward to work with. All results are forced to exponential notation and god forbid if you include a single-digit operand that dumps the precision down to 1. I included some fixed amounts of precision (2 through 14) that seems to work OK. Calculators have their own weird formatting rules that round indiscriminate of significant figures. I threw together something that works like that and labelled it "vulgar." I reluctantly admit that it gives the most intuitive results. At least I got to name it something derogatory, so that makes me feel a little better.

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
