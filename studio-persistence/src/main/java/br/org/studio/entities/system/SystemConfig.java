package br.org.studio.entities.system;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by diogoferreira on 29/09/15.
 */
@Entity
@Table(name = "system_config", catalog = "studio")
@SequenceGenerator(name = "SystemConfigSequence", sequenceName = "system_config_seq", initialValue = 1, allocationSize = 1)
public class SystemConfig implements Serializable{

    @Id
    @GeneratedValue(generator = "SystemConfigSequence", strategy = GenerationType.SEQUENCE)
    private Long id;

    private Boolean ready;


    public void finalizeConfiguration(){
        this.ready = Boolean.TRUE;
    }

    public Boolean isReady(){
        return ready;
    }
}
