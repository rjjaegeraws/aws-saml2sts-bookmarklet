# setup.py

from setuptools import setup
setup(
    name='samlresp2aws',
    version='1.0',
    packages=['samlresp2aws'],
    entry_points={
        'console_scripts' : [
            'samlresp2aws = samlresp2aws.samlresp2aws:main',
        ]
    },
    install_requires=[
        'boto3',
        'configparser'
    ],
    python_requires='>=3.7'
)