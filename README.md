Minecraft Enchantment Simulator
===============================

##Instructions
To download, click on the download tab in the upper right corner of the github page and select 'Single download version'.
- or -
Fork this repo (or download a tagged version) and open index.html in chrome. (Almost works in firefox. Should work in safari, but that is untested.)

Choose material and item type from the menu at the left. The graphs will immediately update to represent the simulated probability of receiving different possible enchantments. Use the + and - buttons to select a chosen enchantment level and see how the probabilities change.



##Details:

The script will run a simulated enchantment of given item at given level a given number of times. The procedure matches
what the minecraft source code does at version 1.0.0, and should be pretty representative.
The data from the simulations, basically a count of how many times each enchantment was received, is then shown in bar
chart form. Mouseover the bars for detailed information.

Each bar will display the mean value for the probability of getting an enchantment as well as (optionally) a 95 percent level
confidence interval. (That means that there is a 95 percent chance that the true value can be found between the upper and
lower line in each bar - based on the simulation.) The middle line in each bar is the mean value. I think the values
forms a normal distribution around this value, but I'm not sure.

##Charts:
Enchantment distribution. - This is the most relevant result of the simulation. Each enchantment seen is
represented by a bar, with the height being set to the percentage of times that enchantment was seen. Note that since
some simulations generate several enchantments at once, the sum of the percentages often become more than 100. (How
much more is given as "enchantment count saturation" in the info box.)

Number of enchantments - A simple chart that shows the probability of receiving multiple enchantments.


##Info box:
This is mainly the bar charts in text form for usability purposes.





##License:
My code and text is published at github.com/zazcallabah/mce with a Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.
Note that this probably doesn't include the ported data extracted from the minecraft source
