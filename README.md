# MEAN stack on an Azure Linux virtual machine

<div  align="center"><img src="https://user-images.githubusercontent.com/17799273/155406524-4bc73a77-a35f-4dd5-b3f0-ad195d256677.png" width="150" height="150" /></div>

*****************************************************************
## Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
  - [Create a VM host your web application](#create-vm)
<!-- - [Usage](#usage)
- [Contributing](../CONTRIBUTING.md) -->
*****************************************************************
## About <a name = "about"></a>


This repo breaks down the process of Building and running a web application with the  a MEAN based web application on a new Azure Linux virtual machine. 

>MEAN is a development stack for building and hosting web applications. MEAN is an acronym for its component parts: MongoDB, Express, AngularJS, and Node.js.

*****************************************************************
## Getting Started <a name = "getting_started"></a>

&emsp; First, We have to create a virtual machine to host our MEAN  web application, to do so, we will use Azure CLI, [Install Azure CLI] if you don't have it installed on your system. Or, login to your azure account and use Azure Cloud ps.

### Create a VM to host your web application  <a name = "create-vm"></a>

&ensp; Azure groups resources (a container that holds the resources) in whats called **resource group**, before you create other resources on Azure.\
So, in order to create a VM you've to create a resource group.

To simplify the process, I will declare that value to reuse later on.
```ps
$RESOURCE_GROUP_NAME = <CHOOSE_YOUR_RESOURCE_GROUP_NAME>
# example: $RESOURCE_GROUP_NAME = "MEAN-STACK-RG"
$APP_NAME = <CHOOSE_YOUR_APP_NAME>
$ADMIN_USERNAME = <CHOOSE_ADMIN_NAME>

```
1. Creating the resource group :
 ````ps
 az group create --name $RESOURCE_GROUP_NAME --location "eastus"

 ````
2. Next, We will creating Virtual Machine :

 ````ps
az vm create \
  --resource-group $RESOURCE_GROUP_NAME \
  --name $APP_NAME \
  --image Canonical:0001-com-ubuntu-server-focal:20_04-lts:latest \
  --admin-username $ADMIN_USERNAME \
  --generate-ssh-keys

 ````

>Wait for it to finish, After its done you should see an Object, Copy & save the `publicIpAddress` 
```json
{
  "fqdns": "",
  "id": "/subscriptions/. . . ./$APP_NAME",
  ...
  "publicIpAddress": "",
}
``` 
```ps
$VM_IP_ADDRESS = <publicIpAddress>

```
3. Next, We allow the incoming HTTP traffic to the web application you'll later create, by opening the port 80:
````ps
az vm open-port \
  --port 80 \
  --resource-group $RESOURCE_GROUP_NAME \
  --name $APP_NAME \
````

4. Create an SSH connection to your VM.
````ps
ssh $ADMIN_USERNAME@$$VM_IP_ADDRESS

````
>When prompted, enter **yes** to trust future connections.



*****************************************************************
 <!-- varialbles -->

 [Install Azure CLI]: https://aka.ms/install-azure-cli