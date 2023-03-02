let activitiez = "activitiez",
followers = "followers",
recentwidget = "recentwidget",
whoswidget = "whoswidget",
shortcutswidget = "shortcutswidget",
yourpagewidget = "yourpagewidget"
friendswidget = "friendswidget",
bannerwidget = "bannerwidget";
dragula([document.getElementById(recentwidget), 
    document.getElementById(whoswidget), 
    document.getElementById(shortcutswidget), 
    document.getElementById(yourpagewidget),
    document.getElementById(friendswidget),
    document.getElementById(yourpagewidget),
    document.getElementById(bannerwidget)
],
{
    // direction: 'vertical'
});