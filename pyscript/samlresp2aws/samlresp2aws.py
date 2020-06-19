#!/usr/bin/env python3

import base64
import sys, getopt, os
import configparser
import re
import boto3

client = boto3.client('sts')

def main(argv=None):

    if argv is None:
        argv = sys.argv[1:]

    samlResponse = ''
    profileName = 'saml2aws'
    try:
      opts, args = getopt.getopt(argv,"hpr:")
    except getopt.GetoptError:
      print('samlresp2aws.py -p [profilename] -r <base64 saml response>')
      sys.exit(2)
    for opt, arg in opts:
      if opt == '-h':
         print('samlresp2aws.py -p [profilename] -r <base64 saml response>')
         sys.exit()
      elif opt in ("-r"):
         samlResponse = arg
    
    if samlResponse != '':
        data = base64.b64decode(samlResponse).decode('utf-8')
        pattern = ">(?P<provider>arn:aws:iam::\\d+:saml-provider/\\S+),(?P<role>arn:aws:iam::(?P<accountid>\\d+):role/(?P<rolename>\\w+))<"
        match = re.finditer(pattern, data)

        if match:
            i = 1
            vals = []
            for m in match:
                print("{}. AccountID: {}, Role: {}".format(i, m.group('accountid'), m.group('rolename')))
                i = i + 1
                vals.append(m)

            choice = input("Select the role to assume: ")  
            
            p = vals[int(choice)-1]
            print("Assuming role for {}-{}...".format(p.group('accountid'), p.group('rolename')))
            try:
                creds = client.assume_role_with_saml(
                    RoleArn=p.group('role'),
                    PrincipalArn=p.group('provider'),
                    SAMLAssertion=samlResponse,
                    DurationSeconds=3600
                )
                tempCredentials = creds['Credentials']

                write_credentials(profileName, tempCredentials)

                print("Credentials saved to profile '{}'".format(profileName))
                
                print("Ex: aws sts get-caller-identity --profile {}".format(profileName))

            except Exception as e: 
                print("Unexpected error:", e)


def write_credentials(profile, credentials):
    filename = os.path.expanduser('~/.aws/credentials')
    dirname = os.path.dirname(filename)

    if not os.path.exists(dirname):
        os.makedirs(dirname)

    config = configparser.ConfigParser()
    config.read(filename)
    if not config.has_section(profile):
        config.add_section(profile)
    config.set(profile, 'aws_access_key_id', credentials['AccessKeyId'])
    config.set(profile, 'aws_secret_access_key', credentials['SecretAccessKey'])
    config.set(profile, 'aws_session_token', credentials['SessionToken'])
    with open(filename, 'w') as fp:
        config.write(fp)

if __name__ == '__main__':
    print(sys.argv[1:])
    main(sys.argv[1:])