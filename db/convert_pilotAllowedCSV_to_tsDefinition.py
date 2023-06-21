# Run this helper script to convert the current csv file of jobtypes and 
# if they're allowed in a pilot into a TypeScript variable definition

import csv
import json

csv_file = "./db/jobtypes_pilotAllowed.csv"
ts_file = "./src/utils/pilotJobs.ts"

jobs = []

with open(csv_file, "r") as f:
    csv_reader = csv.reader(f)
    next(csv_reader)  # skip header
    for row in csv_reader:
        jobtype, pilot_allowed = row
        jobs.append({
            "jobtype": jobtype,
            "pilot_allowed": pilot_allowed.lower() == "yes"
        })

with open(ts_file, "w") as f:
    f.write("//./src/utils/pilotJobs.ts\n")
    f.write("// NOTE: This file is automatically created by ./db/convert_pilotAllowedCSV_to_tsDefinition.py\n")
    f.write("// Any changes made to this file may be overwritten by that script\n\n")
    f.write("export const jobsInPilotAllowed = [\n")
    for job in jobs:
        f.write("    " + json.dumps(job, ensure_ascii=False) + ",\n")
    f.write("];\n")
