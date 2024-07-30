#!/usr/bin/env python3
#Required imports
import yaml
import argparse
import os
import sys
import time
from functools import reduce
from runner.config import TOOLS, TOOL_CHOICES, DATASET_CHOICES

TOOL_CHOICES_ALL = ['all']
TOOL_CHOICES_ALL.extend(TOOL_CHOICES)
DATASET_CHOICES_ALL = ['all']
DATASET_CHOICES_ALL.extend(DATASET_CHOICES)
VERSION_CHOICES = ['v1', 'v2']
VERSION_CHOICES_ALL = ['all']
VERSION_CHOICES_ALL.extend(VERSION_CHOICES)

class InfoAction(argparse.Action):
    def __call__(self, parser, namespace, values, option_string=None):
        for tool in values:
            if tool in TOOLS and 'info' in TOOLS[tool]:
                print(f'\x1b[1;37m{tool}\x1b[0m: {TOOLS[tool]["info"]}')
            else:
                print(f'\x1b[1;37m{tool}\x1b[0m: no information provided for this tool.')
        parser.exit()


class ListAction(argparse.Action):
    def __call__(self, parser, namespace, values, option_string=None):
        for value in values:
            if value == 'tools':
                print('All SCAL Audit tools are listed below: ')
                for tool in TOOL_CHOICES_ALL:
                    print(tool, end=' ')
                print()
            elif value == 'contracts':
                print('All smart contract vulnerabilities list in SCAL:')
                for contract in DATASET_CHOICES_ALL:
                    print(contract, end=' ')
                print()
        parser.exit()

def arguments():
    parser = argparse.ArgumentParser(description="Static analysis of Ethereum smart contracts")
    group_source_files = parser.add_mutually_exclusive_group(required='True')
    group_tools = parser.add_mutually_exclusive_group(required='True')
    parser._optionals.title = "options:"

    parser.register('action', 'info', InfoAction)
    info = parser.add_argument_group('info')

    parser.register('action', 'list_option', ListAction)
    list_option = parser.add_argument_group('list_option')

    group_source_files.add_argument('-f', '--file',
                        nargs='+',
                        default=[],
                        help='solidity file(s) or directories to be analysed')

    group_source_files.add_argument('-c', '--contract',
                        metavar='CONTRACT',
                        choices=DATASET_CHOICES_ALL,
                        nargs='+',
                        help=f'analyse pre-defined contract, where CONTRACT may be "all" for all contracts, or one of: {", ".join(DATASET_CHOICES)}')

    group_tools.add_argument('-t', '--tool',
                        metavar='TOOL',
                        choices=TOOL_CHOICES_ALL,
                        nargs='+',
                        help=f'tool to run on the contracts, where TOOL may be "all" for all tools, or one of: {", ".join(TOOL_CHOICES)}')

    list_option.add_argument('-l', '--list',
                        choices=['tools', 'contracts'],
                        nargs='+',
                        action='list_option',
                        help='list tools or contracts')

    info.add_argument('-i', '--info',
                        metavar='TOOL',
                        nargs='+',
                        action='info',
                        help=f'show information about TOOL, where TOOL may be one of: {", ".join(TOOL_CHOICES)}')

    info.add_argument('--bounce',
                        action='store_true',
                        help='leave contracts that have already been analysed')

    info.add_argument('--execution-name',
                        type=str,
                        metavar='ID',
                        default=f'{time.strftime("%Y%m%d_%H%M", time.localtime())}',
                        help='string identifying this run, used for file and directory names (default: date and time of run)')

    info.add_argument('--operations',
                        type=int,
                        metavar='N',
                        default=1,
                        help='maximal number of parallel processes (default 1)')

    info.add_argument('--output-version',
                        choices=VERSION_CHOICES_ALL,
                        default='all',
                        help='Scal\' version output - v1: Json - v2:SARIF')

    info.add_argument('--aggregate-sarif',
                        action='store_true',
                        help='Aggregate sarif outputs for different tools run on the same file')

    info.add_argument('--import-path',
                        type=str,
                        default="FILE",     # different directory solidity imports will not work
                        help="Project's root directory")

    info.add_argument('--unique-sarif-output',
                      action='store_true',
                      help='Aggregates all sarif analysis outputs in a single file')

    args = parser.parse_args()
    return(vars(args))
