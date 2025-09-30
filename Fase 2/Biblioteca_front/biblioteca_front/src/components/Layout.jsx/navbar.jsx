import { NavLink } from "react-router";

export function Navbar() {
    return (
        <div>
            <nav>
                <div class="menu-cta-container"><ul id="menu-cta" class="menu"><li id="menu-item-42" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-40 current_page_item menu-item-42"><a href="https://www.escuelaaeronautica.gob.cl/" aria-current="page">Home</a></li>
                    <li id="menu-item-160" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-160"><a href="#">Escuela</a>
                        <ul class="sub-menu">
                            <li id="menu-item-161" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-161"><a href="https://www.escuelaaeronautica.gob.cl/mision-vision-y-organigrama/">Misión, Visión y Organigrama</a></li>
                            <li id="menu-item-162" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-162"><a href="https://www.escuelaaeronautica.gob.cl/historia/">Historia</a></li>
                            <li id="menu-item-163" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-163"><a href="https://www.escuelaaeronautica.gob.cl/nuestros-valores/">Nuestros Valores</a></li>
                            <li id="menu-item-177" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-177"><a href="https://www.escuelaaeronautica.gob.cl/acreditacion-cna/">Acreditación</a></li>
                            <li id="menu-item-363" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-363"><a href="https://www.escuelaaeronautica.gob.cl/donde-estamos/">Dónde Estamos</a></li>
                        </ul>
                    </li>
                    <li id="menu-item-44" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-44"><a href="#">Carreras</a>
                        <ul class="sub-menu">
                            <li id="menu-item-1166" class="menu-item menu-item-type-post_type menu-item-object-carrera menu-item-1166"><NavLink to="/Hola">chupalo</NavLink></li>
                            <li id="menu-item-1243" class="menu-item menu-item-type-post_type menu-item-object-carrera menu-item-1243"><a href="https://www.escuelaaeronautica.gob.cl/carrera/control-de-transito-aereo/">Control de Tránsito Aéreo – CTA</a></li>
                            <li id="menu-item-1244" class="menu-item menu-item-type-post_type menu-item-object-carrera menu-item-1244"><a href="https://www.escuelaaeronautica.gob.cl/carrera/tecnico-de-nivel-superior-en-seguridad/">Salvamento y Extinción de Incendios en Aeronaves -SSEI</a></li>
                            <li id="menu-item-1245" class="menu-item menu-item-type-post_type menu-item-object-carrera menu-item-1245"><a href="https://www.escuelaaeronautica.gob.cl/carrera/seguridad-aeroportuaria/">Seguridad Aeroportuaria – AVSEC</a></li>
                            <li id="menu-item-1326" class="menu-item menu-item-type-post_type menu-item-object-carrera menu-item-1326"><a href="https://www.escuelaaeronautica.gob.cl/carrera/meteorologia/">Meteorología -METEO</a></li>
                            <li id="menu-item-1751" class="menu-item menu-item-type-post_type menu-item-object-carrera menu-item-1751"><a href="https://www.escuelaaeronautica.gob.cl/carrera/instrumental-meteorologico-tim/">Instrumental Meteorológico-TIM</a></li>
                            <li id="menu-item-2697" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-2697"><a href="https://www.escuelaaeronautica.gob.cl/carrera/tecnico-en-meteorologia/">Técnico en Meteorología</a></li>
                            <li id="menu-item-3245" class="menu-item menu-item-type-post_type menu-item-object-carrera menu-item-3245"><a href="https://www.escuelaaeronautica.gob.cl/carrera/abastecimiento-aba/">TNS Logística Aeronáutica – LOG</a></li>
                        </ul>
                    </li>
                    <li id="menu-item-48" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-48"><a href="#">Estudiantes</a>
                        <ul class="sub-menu">
                            <li id="menu-item-269" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-269"><a href="https://www.escuelaaeronautica.gob.cl/asuntos-estudiantiles/">Asuntos Estudiantiles</a></li>
                            <li id="menu-item-123" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-123"><a target="_blank" href="http://sistema.tne.cl/reposiciones/estado_tarjeta_alumno">Consulta el estado de TNE</a></li>
                            <li id="menu-item-124" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-124"><a target="_blank" href="https://www.escuelaaeronautica.gob.cl/cvirtual/">Comunidad Estudiantil</a></li>
                            <li id="menu-item-3027" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-3027"><a href="https://www.escuelaaeronautica.gob.cl/home/canal-de-denuncias/">Canal de Denuncias – Ley 21.369</a></li>
                        </ul>
                    </li>
                    <li id="menu-item-51" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-51"><a href="https://www.escuelaaeronautica.gob.cl/documentos/">Documentos</a></li>
                    <li id="menu-item-1783" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-1783"><a href="https://www.escuelaaeronautica.gob.cl/preguntas-frecuentes-2/">Preguntas frecuentes</a></li>
                </ul></div>				</nav>
        </div>
    )
}