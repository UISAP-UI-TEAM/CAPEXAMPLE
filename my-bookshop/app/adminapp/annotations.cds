using AdminService as service from '../../srv/admin';
annotate service.MaintenanceItem with @(
    odata.draft.enabled:true,    
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'S4 Id',
                Value : s4Id,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Problem Description',
                Value : problemDescription,
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup',
        },
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'S4 Id',
            Value : s4Id,
        },
        {
            $Type : 'UI.DataField',
            Label : 'ProblemDescription',
            Value : problemDescription,
        },
    ],
);

