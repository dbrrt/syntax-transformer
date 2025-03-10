import { WriteAuthorizationModelRequest } from "@openfga/sdk";

export const testModels: { name: string; json: WriteAuthorizationModelRequest; friendly: string }[] = [
  {
    name: "one type with no relations",
    json: {
      schema_version: "1.0",
      type_definitions: [
        {
          type: "document",
          relations: {},
        },
      ],
    },
    friendly: "type document\n",
  },
  {
    name: "one type with no relations and another with one relation",
    json: {
      schema_version: "1.0",
      type_definitions: [
        {
          type: "group",
          relations: {},
        },
        {
          type: "document",
          relations: {
            viewer: {
              this: {},
            },
            editor: {
              this: {},
            },
          },
        },
      ],
    },
    friendly: "type group\ntype document\n  relations\n    define viewer as self\n    define editor as self\n",
  },
  {
    name: "simple model",
    json: {
      schema_version: "1.0",
      type_definitions: [
        {
          type: "document",
          relations: {
            viewer: {
              this: {},
            },
            editor: {
              this: {},
            },
          },
        },
      ],
    },
    friendly: "type document\n  relations\n    define viewer as self\n    define editor as self\n",
  },
  {
    name: "multiple types",
    json: {
      schema_version: "1.0",
      type_definitions: [
        {
          type: "folder",
          relations: {
            editor: {
              this: {},
            },
          },
        },
        {
          type: "document",
          relations: {
            parent: {
              this: {},
            },
            editor: {
              union: {
                child: [
                  {
                    this: {},
                  },
                  {
                    tupleToUserset: {
                      tupleset: {
                        object: "",
                        relation: "parent",
                      },
                      computedUserset: {
                        object: "",
                        relation: "editor",
                      },
                    },
                  },
                ],
              },
            },
          },
        },
      ],
    },
    friendly: `type folder
  relations
    define editor as self
type document
  relations
    define parent as self
    define editor as self or editor from parent
`,
  },
  {
    name: "difference",
    json: {
      schema_version: "1.0",
      type_definitions: [
        {
          type: "document",
          relations: {
            blocked: {
              this: {},
            },
            editor: {
              difference: {
                base: {
                  this: {},
                },
                subtract: {
                  computedUserset: {
                    object: "",
                    relation: "blocked",
                  },
                },
              },
            },
          },
        },
        {
          type: "team",
          relations: {
            member: {
              this: {},
            },
          },
        },
      ],
    },
    friendly: `type document
  relations
    define blocked as self
    define editor as self but not blocked
type team
  relations
    define member as self
`,
  },
  {
    name: "intersection",
    json: {
      schema_version: "1.0",
      type_definitions: [
        {
          type: "document",
          relations: {
            owner: {
              this: {},
            },
            writer: {
              this: {},
            },
            can_write: {
              computedUserset: {
                object: "",
                relation: "writer",
              },
            },
            can_delete: {
              intersection: {
                child: [
                  {
                    computedUserset: {
                      object: "",
                      relation: "writer",
                    },
                  },
                  {
                    tupleToUserset: {
                      tupleset: {
                        object: "",
                        relation: "owner",
                      },
                      computedUserset: {
                        object: "",
                        relation: "member",
                      },
                    },
                  },
                ],
              },
            },
          },
        },
        {
          type: "organization",
          relations: {
            member: {
              this: {},
            },
          },
        },
      ],
    },
    friendly: `type document
  relations
    define owner as self
    define writer as self
    define can_write as writer
    define can_delete as writer and member from owner
type organization
  relations
    define member as self
`,
  },
  {
    name: "relations-starting-with-as",
    json: {
      schema_version: "1.0",
      type_definitions: [
        { type: "org", relations: { member: { this: {} } } },
        {
          type: "feature",
          relations: {
            associated_plan: { this: {} },
            access: {
              tupleToUserset: {
                tupleset: { object: "", relation: "associated_plan" },
                computedUserset: { object: "", relation: "subscriber_member" },
              },
            },
          },
        },
        {
          type: "plan",
          relations: {
            subscriber: { this: {} },
            subscriber_member: {
              tupleToUserset: {
                tupleset: { object: "", relation: "subscriber" },
                computedUserset: { object: "", relation: "member" },
              },
            },
          },
        },
        {
          type: "permission",
          relations: {
            access_feature: {
              tupleToUserset: {
                tupleset: {
                  object: "",
                  relation: "associated_feature",
                },
                computedUserset: { object: "", relation: "access" },
              },
            },
            associated_feature: { this: {} },
          },
        },
      ],
    },
    friendly: `type org
  relations
    define member as self
type feature
  relations
    define associated_plan as self
    define access as subscriber_member from associated_plan
type plan
  relations
    define subscriber as self
    define subscriber_member as member from subscriber
type permission
  relations
    define access_feature as access from associated_feature
    define associated_feature as self
`,
  },
  {
    name: "one type with one relation that supports one type",
    json: {
      schema_version: "1.1",
      type_definitions: [
        {
          type: "document",
          relations: {
            viewer: {
              this: {},
            },
          },
          metadata: {
            relations: {
              viewer: { directly_related_user_types: [{ type: "team", relation: "member" }] },
            },
          },
        },
      ],
    },
    friendly: `model
  schema 1.1
type document
  relations
    define viewer: [team#member] as self
`,
  },
  {
    name: "one type with one relation that supports two types",
    json: {
      schema_version: "1.1",
      type_definitions: [
        {
          type: "document",
          relations: {
            viewer: {
              this: {},
            },
          },
          metadata: {
            relations: {
              viewer: { directly_related_user_types: [{ type: "user" }, { type: "group" }] },
            },
          },
        },
      ],
    },
    friendly: `model
  schema 1.1
type document
  relations
    define viewer: [user,group] as self
`,
  },
];
