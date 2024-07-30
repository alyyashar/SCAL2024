#Required imports
import colorama, re
from colorama import Fore, Style

#This file is used for setting color on various CLI output strings as required


#Removing all ansi directives from the string
ANSIcolor = re.compile('\x1b\[[^m]*m')

def strip(s):
    #Keeps the color in the substring
    return ANSIcolor.sub('',str(s))

def color(col, s):
    #Resetting color styles
    return f"{col}{s}{Style.RESET_ALL}"

def file(s):
    #setting color
    return color(Fore.BLUE, s)

def tool(s):
    #setting color
    return color(Fore.CYAN, s)

def error(s):
    #setting color
    return color(Fore.RED, s)

def warning(s):
    #setting color
    return color(Fore.YELLOW, s)

def success(s):
    #setting color
    return color(Fore.GREEN, s)


