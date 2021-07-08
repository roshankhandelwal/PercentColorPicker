# PercentColorPicker
React Component to pick colors. 

- The start of the bar is *minVal*, and the end of the bar is *maxVal*
- Click on the bar, to create ranges.
- Click on a point to open the picker & choose a different color. ( Value less than the created point would be shown in that color.)
- Right click on a point to remove it.

### Copy the file to an existing React project ( > 16.8 )

Use it as 
```
<PercentColorChooser minVal={minVal} maxVal={maxVal}></PercentColorChooser>
```
