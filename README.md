# Dashboard F1

This is how retrive data from Ergast API, organize in 4 tables. These tables are used to show statistics in one Tableau dashboard e one LookStudio Dashboard.


# Using

1. Run the python files to extract, clean and organize data from Ergast API.
2. Save the final dataframe on 4 Google sheets.
3. Use the Google AppScript to set up the triggers to automatically update the data on the dashboards.
4. Connect the Google sheets to Tableau and Looker to create the visualizations and dashboards.
5. Access the dashboards to view and analyze the statistics of the Formula 1 drivers and teams.

# Dependencies

* pandas
* requests
* google-auth
* google-auth-oauthlib
* google-auth-httplib2
* Google AppScript
* Tableau
* Looker Studio


# Licence 
This project is licensed under the MIT License. For more information, see the LICENSE file.
