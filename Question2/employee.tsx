class OldEmployee{
    managerFlag: boolean;
    name: string;
    dateHired: Date;
    id: number;
    getName (){/**Implementation */}
    getID (){/**Implementation */}
    isManager (){/**Implementation */}
}


enum EmployeeType {
    MANAGER, PART_TIME_EMPLOYEE, EMPLOYEE
}

class NewEmployee{
    employeeType: EmployeeType;
    name: string;
    dateHired: Date;
    id: number;
    getName (){/**Implementation */}
    getID (){/**Implementation */}
    getType (){/**Implementation */}
}


// We can add type enum for determining employment type