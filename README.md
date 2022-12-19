# MEAN stack on an Azure virtual machine

<div  align="center"><img src="https://user-images.githubusercontent.com/17799273/155406524-4bc73a77-a35f-4dd5-b3f0-ad195d256677.png" width="150" height="150" /></div>

<!-- <div  align="center"><img src="./app-screenshot.png" width="150" height="150" /></div> -->

---

## Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
  - [Create a VM host your web application](#create-vm)
  - [Install each component of the MEAN stack ](#install-mean)

---

## About <a name = "about"></a>

This repo breaks down the process of Building and running a web application with the a MEAN based web application on a new Azure Linux virtual machine.

> MEAN is a development stack for building and hosting web applications. MEAN is an acronym for its component parts: MongoDB, Express, AngularJS, and Nodejs.

---

## Getting Started <a name = "getting_started"></a>

&emsp; First, We have to create a virtual machine to host our MEAN web application, to do so, we will use Azure CLI, [Install Azure CLI] if you don't have it installed on your system. Or, login to your azure account and use Azure Cloud Shell.

### - Create a VM to host your web application <a name="create-vm"></a>

&ensp; Azure groups resources (a container that holds the resources) in whats called **resource group**, before you create other resources on Azure.\
So, in order to create a VM you've to create a resource group.

To simplify the process, I will declare that value to reuse later on.

```ps
$ $RESOURCE_GROUP_NAME = <CHOOSE_YOUR_RESOURCE_GROUP_NAME>
# example: $RESOURCE_GROUP_NAME = "MEAN-STACK-RG"
$ $VM_NAME = <CHOOSE_YOUR_VM_NAME>
$ $ADMIN_USERNAME = <CHOOSE_ADMIN_NAME>
```

1. Creating the resource group :

```ps
$ az group create --name $RESOURCE_GROUP_NAME --location "eastus"
```

2. Next, We will create Ubuntu Linux Virtual Machine :

```ps
$ az vm create \
 --resource-group $RESOURCE_GROUP_NAME \
 --name $VM_NAME \
 --image Canonical:0001-com-ubuntu-server-focal:20_04-lts:latest \
 --admin-username $ADMIN_USERNAME \
 --generate-ssh-keys
```

> Wait for it to finish, After its done you should see an Object, Copy & save the `publicIpAddress`

```json
{
  "fqdns": "",
  "id": "/subscriptions/. . . ./$VM_NAME",
  ...
  "publicIpAddress": "",
}
```

```ps
$ $VM_IP_ADDRESS = <publicIpAddress>
```

3. Next, We allow the incoming HTTP traffic to the web application you'll later create, by opening the port 80:

```ps
$ az vm open-port \
  --port 80 \
  --resource-group $RESOURCE_GROUP_NAME \
  --name $VM_NAME \
```

4. Create an SSH connection to your VM.

```ps
$ ssh $ADMIN_USERNAME@$VM_IP_ADDRESS
```

> When prompted, enter **yes** to trust future connections.

With your Ubuntu VM ready to go, you're ready for the next step.

### - Install each component of the MEAN stack <a name="install-mean"></a>

&emsp; Now that you ssh to the VM, You'll start by installing MongoDB.

- First, we'll make sure all current packages are up to date.

```ps
$ sudo apt update && sudo apt upgrade
```

- I. Install MongoDB :

```ps
$ sudo apt-get install mongodb
```

When installation is complete, the service automatically start up. You can confirm by running this command:

```ps
$ sudo systemctl status mongodb
```

```ps
    ● mongodb.service - An object/document-oriented database
        Loaded: loaded (/lib/systemd/system/mongodb.service; enabled; vendor preset: enabled)
        Active: active (running) since Fri 2022-02-25 21:05:06 UTC; 10min ago
          Docs: man:mongod(1)
      Main PID: 641 (mongod)
          Tasks: 23 (limit: 4102)
        Memory: 209.4M
        CGroup: /system.slice/mongodb.service
                └─641 /usr/bin/mongod --unixSocketPrefix=/run/mongodb --config /etc/mongodb.conf
```

- II. Next, Install Nodejs :

Register the Nodejs repository so the package manager can locate the packages,

```ps
$ curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -
```

Install the Nodejs:

```ps
$ sudo apt install nodejs
```

When installation is complete, Run `node -v` to verify the installation:

```ps
$ node -v
v16.14.0
```
---

 <!-- varialbles -->

[install azure cli]: https://aka.ms/install-azure-cli
