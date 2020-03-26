#if (${PACKAGE_NAME} && ${PACKAGE_NAME} != "")
package ${PACKAGE_NAME};
#end
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import javax.faces.application.FacesMessage;
import javax.faces.context.FacesContext;
import javax.faces.model.DataModel;
import javax.faces.model.ListDataModel;
import javax.faces.model.SelectItem;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.Query;

${entityInfo.entityImport}

#parse("Java File Header.java")
public class ${CLASS_NAME} {
    final public static String SELECT_ALL_ENTITIES_SQL = "SELECT o FROM ${entityInfo.name} AS o";

    private ${entityInfo.name} myEntity;

    private EntityManagerFactory myEntityManagerFactory;

    private ListDataModel myList;
    private ListDataModel myReferencesEntities; // M-N and M-1 references

    public ${CLASS_NAME}() {
        myEntityManagerFactory = Persistence.createEntityManagerFactory("${PERSISTENCE_UNIT_NAME}");
    }

    private EntityManagerFactory getEntityManagerFactory() {
       return myEntityManagerFactory;
    }

    public ${entityInfo.name} getEntity() {
        return myEntity;
    }

    public void setEntity(${entityInfo.name} entity) {
        myEntity = entity;
    }

    // add new ${entityInfo.name}
    public String create() {
        EntityManager entityManager = getEntityManagerFactory().createEntityManager();
        try {
            entityManager.getTransaction().begin();
            entityManager.persist(getEntity());
            entityManager.getTransaction().commit();
        } catch (Exception ex) {
            try {
              entityManager.getTransaction().rollback();
            } catch (Exception e) {
            }
        }
        entityManager.close();

        return "${entityInfo.listAction}";
    }

    // save edited ${entityInfo.name}
    public String save() {
        EntityManager entityManager = getEntityManagerFactory().createEntityManager();
        try {
            entityManager.getTransaction().begin();
            myEntity = entityManager.merge(getEntity());
            entityManager.getTransaction().commit();
        } catch (Exception ex) {
            try {
               entityManager.getTransaction().rollback();
            } catch (Exception e) {
            }
        }
        entityManager.close();
        return "${entityInfo.listAction}";
    }

    // delete ${entityInfo.name}
    public String delete() {
        EntityManager entityManager = getEntityManagerFactory().createEntityManager();
        try {
            entityManager.getTransaction().begin();
            ${entityInfo.name} entity = getCurrentEntity();
            entity = entityManager.merge(entity);
            entityManager.remove(entity);
            entityManager.getTransaction().commit();
        } catch (Exception ex) {
            try {
              entityManager.getTransaction().rollback();
            } catch (Exception e) {
            }
        }
        entityManager.close();

        return "${entityInfo.listAction}";
    }

    public DataModel getReferencedEntities() {
        return myReferencesEntities;
    }

    public void setReferencedEntities(Collection<${entityInfo.name}> entities) {
        myReferencesEntities = new ListDataModel(new ArrayList<${entityInfo.name}>(entities));
    }

    public String startCreate() {
        myEntity = new ${entityInfo.name}();
        #foreach($attrInfo in ${entityInfo.embeddedAttrs})
            #if (${attrInfo.fieldAccesed})
               myEntity.${attrInfo.name} = new ${attrInfo.attributeType}();
            #else
               myEntity.${attrInfo.setterName}(new ${attrInfo.attributeType}()); 
            #end
        #end
        return "${entityInfo.createAction}";
    }

    public String startView() {
        setEntityFromRequestParam();
        return "${entityInfo.viewAction}";
    }

    public String startEdit() {
        setEntityFromRequestParam();
        return "${entityInfo.editAction}";
    }

    public ${entityInfo.name} getCurrentEntity() {
        ${entityInfo.name} entity = getEntityFromRequestParam();

        return entity == null ? myEntity : entity;
    }

    public ${entityInfo.name} getEntityFromRequestParam() {
        if (myList == null) return null;

        EntityManager entityManager = getEntityManagerFactory().createEntityManager();
        ${entityInfo.name} entity = (${entityInfo.name}) myList.getRowData();
        entity = entityManager.merge(entity);
        entityManager.close();

        return entity;
    }

    public void setEntityFromRequestParam() {
        myEntity = getCurrentEntity();
    }

    public ${entityInfo.name} findEntity(${entityInfo.pkClass} id) {
        EntityManager entityManager = getEntityManagerFactory().createEntityManager();

        ${entityInfo.name} entity = entityManager.find(${entityInfo.name}.class, id);

        entityManager.close();

        return entity;
    }

    public DataModel getAllEntities() {
        myList = new ListDataModel(getEntities());

        return myList;
    }

    public SelectItem[] getAllEntitiesAsSelectedItems() {
        List<${entityInfo.name}> entities = getEntities();
        SelectItem selectItems[] = new SelectItem[entities.size()];
        int i = 0;
        for (${entityInfo.name} entity : entities) {
            selectItems[i++] = new SelectItem(entity);
        }
        return selectItems;
    }

    public List<${entityInfo.name}> getEntities() {
        EntityManager entityManager = getEntityManagerFactory().createEntityManager();

        List<${entityInfo.name}> entities = (List<${entityInfo.name}>) entityManager.createQuery(SELECT_ALL_ENTITIES_SQL).getResultList();

        entityManager.close();

        return entities;
    }
}
