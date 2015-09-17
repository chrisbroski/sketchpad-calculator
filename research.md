Sketchpad Calculator
====================

The other day I needed to do some simple math. I can't remember if it was to find the amount of material needed for a home improvement, to calculate the best value for a purchase, or just helping my daughter with her homework. I found a pen and paper to set up the problem, then used the default calculator on my Android phone to perform the calculation…

It struck me—what the heck is happening? If the calculator was so great, why am I still using pen and paper? I examined my actions and observed that how I wanted to do these calculations was incompatible with the calculator UI, but not inherently. Now I had a challenge: could I create a calculator UI to enable the natural way people perform math tasks and eliminate my need for pad and paper?

###Why Current Calculator Apps Suck

When calculators were first developed, they were miracles of engineering, but the immaturity of the technology had limited options for the user interface. We had to learn how to use a calculator. We changed our behavior to match the interface of the first calculators, and it was well worth the effort. But this was decades ago, and the calculator interface has stayed relatively the same. Skimming through calculator apps in the Google store, the overwhelmingly most common UI design is a realistic photo of a hand-held calculator. This is not what innovation looks like. We have the technology today to make a mathematical interface intuitive and effortless, and that is exactly what I want to attempt.

###First Wireframe UI

Writers scribble a first draft; painters begin with a rough sketch. I have found that a powerful start to a new design is to build the first solution that comes to mind as quickly as possible, without concern for visual beauty, then listen to what that teaches you. I based my first design on how math is done on a pad of paper. My goal was to create a digital UI that reproduces that exact same process, step-by-step.

Making a proof-of-concept UI can require a lot of self-discipline because it is going to look and work horribly. It will be a buggy, clunky, feature-poor hack that is nowhere near a viable product. That's OK. Get yourself psyched up for the inevitable suck. This is a research exercise, and the goal is to learn more about the target problem. Don't show this to anyone. They wouldn't understand.

Another struggle when creating a fast first prototype is cutting noncritical features. The hard ones for me to leave out were:

###Mobile Version

Even though the entire point of the project is to make a better calculator for my mobile phone, designing and testing mobile web is slower and more complex than for the desktop. To increase the speed of testing iterations, I decided to wait until I was happy with a desktop version before developing the mobile interface.

###Backspace/Delete

Being able to fix minor errors will be a great feature in the final version, but for testing? No so much. I am going to use random numbers to test, so it isn't even important if the results are calculated correctly.

###Features

The features that I ended up including were:

* **Cursor** at active input area. I originally left this out, but quickly realized it is critical for the user to know what the heck is going on in the input area.
* **Keyboard Input** - No touchscreen numberpad yet.
* **Operators** for addition, subtraction, multiplication, and division only.
* **No Exponents** - Only allow positive, negative, and decimal numbers.
* **Running History** of all calculations always visible. This is the key new feature I want to evaluate.
* **Entry From History** - Clicking on a number from history enters that number into the active calculation. This is fancy, but once the running history was implemented, the UI just screamed for this.
* **Rounding** to reasonable precision. This was not originally anything a cared about, but once I started displaying results, it became clear this was a problem that needed dealing with.

These were the features that I ended up with, not those that I started with. I said that building a first prototype was a learning experience and I learned a lot. Even though I needed to keep it simple, I discovered several features that were critical that I had previously not thought were important.

####Click History to Insert Into Active Calculation

This is definitely a fancy feature, and I had promised myself to keep it simple, but after a little use of the interface, the running history of past calculations just screamed for this ability. (And if my experimental UI doesn't bring anything new and cool to the table, what is the point?) This is exactly the kind of emergent feature I was hoping to discover while experimenting with the new interface. The lack of this functionality was also a pain point for me when using the old fashioned 1-at-a-time calculations of the traditional calculator. I always seemed to be re-entering numbers over and over that I had just seen on the screen, but were now lost to the void.

####Custom Precision Rounding

I was hoping to avoid having to deal with it but it became necessary very quickly. Division can easily produce a large amount of digits after the decimal that are nonsensical and hurt readability. Also, with JavaScript converting numbers to floating-point you can get some unexpected results. (Try adding 0.1 and 0.2 in your Chrome console.) It is also a pet peeve of mine that nobody (apart from chemists it seems) understands how to use significant figures to determine the proper precision of a final result. I'd like to say I solved this, but I can't say that, because I didn't. I did explore it with a drop-down that rounds in differen ways.

###My Completed Wireframe

I said that you should never show this to anyone because they will judge it against finished product and they'll think you are a terrible developer and give you no constructive feedback. I am going to break that rule and show it to you because we are savvy UI designers that get it:

[First Sketchpad Calculator Prototype](http://chrisbroski.github.io/sketchpad-calculator/sketchpad-calc.html)

###Results
----------

A first prototype is an experiment with the most key question to be answered, "Are the results promising enough that I should I invest more effort in this design, or throw it away and start over?" Time to examine the benefits and drawbacks of the prototype.

####Benefits

Compared to a traditional calculator UI, having active and previous calculations displayed is a clear and powerful improvement. (One-click entry of previous numbers is nice too.)

####Weaknesses

Inherent drawbacks (ones that can't be easily fixed with a little more work.) Doing complex scientific calculations are not appropriate to this UI, but that was not the intended type of calculation. You would probably want to use a different piece of software for performing more complex formal mathematics. The mess with precision I can hopefully get a handle on, but there is no guarantee.

As far as I can guess, adding backspace and mobile UI could make this a viable version 1.0.

####Conclusion

The new UI is promising, and probably worth spending the time to make a proper version.

Finalizing Version 1.0
======================

The <a href="http://chrisbroski.github.io/sketchpad-calculator/wire">final wireframe</a> was designed for mobile with a backspace key and usable numberpad. I made the results round to a precision of 8 digits and trimmed trailing zeros after the decimal, unless the dollar sign ($) or scientific notation (×10<sup>x</sup>) is in a term in the calculation. If a dollar sign is included in any term, it will always round to the nearest penny. If any term is scientific notation, they it will round to the precision of the least precise term. I added a manifest and other meta-tags to allow it to be added to the home screen of a mobile device. 

Finally Adding Decoration
=========================

Developing using wireframes does not mean that superfluous styles will never be added to the UI, only that the decoration happens at the end. I want to eventualy add this to mobile app stores, so this is a good time to gussy it up for the prom.

First, I looked for a title font appropriate for "Sketchpad Calculator" at <a href="https://www.google.com/fonts">Google Fonts</a>. I chose one that seemed appropriate but it looked lousy so I asked some friends to pick a different one that tuerned out to be much better.

For the keyboard, I did a google image search for "calculator interface" and styled mine to look like everyone else's. If I learned one thing in Junior High School, it's if you want to be cool, imitate the popular kids.

The last thing I did was realign the numberpad to the right side to make it easier to use on large tablets. <a href="http://chrisbroski.github.io/sketchpad-calculator/wire">The final version</a> ended up looking surprisingly professional for DIY graphic design. I even made a <a hrerf="https://play.google.com/store/apps/details?id=com.chaosscape.sketchpadcalc&hl=en">Cordova version for the Google Play store</a>.
